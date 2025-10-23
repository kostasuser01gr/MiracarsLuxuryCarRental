/**
 * Cloud Functions for Mira Cars
 * 
 * Implements:
 * - Booking orchestration (reserve, hold, confirm)
 * - Pricing calculations with seasonal adjustments
 * - Availability management
 * - Webhooks for payments (placeholder)
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { zonedTimeToUtc } from 'date-fns-tz';
import { addDays, differenceInDays } from 'date-fns';

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const ATHENS_TZ = 'Europe/Athens';

/**
 * Calculate booking price with seasonal adjustments
 */
export const calculateBookingPrice = functions.https.onCall(async (data, context) => {
  try {
    const { vehicleId, startDate, endDate, promoCode } = data;

    // Validate inputs
    if (!vehicleId || !startDate || !endDate) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required fields: vehicleId, startDate, endDate'
      );
    }

    // Get vehicle data
    const vehicleDoc = await db.collection('vehicles').doc(vehicleId).get();
    if (!vehicleDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Vehicle not found');
    }

    const vehicle = vehicleDoc.data()!;
    const start = zonedTimeToUtc(startDate, ATHENS_TZ);
    const end = zonedTimeToUtc(endDate, ATHENS_TZ);
    const days = differenceInDays(end, start);

    if (days < 1) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'End date must be after start date'
      );
    }

    // Get applicable pricing rules
    const pricingRulesSnapshot = await db
      .collection('pricingRules')
      .where('active', '==', true)
      .get();

    let seasonalMultiplier = 1.0;
    // Apply seasonal pricing logic here
    // For now, using default multiplier

    // Calculate base price
    const dailyRate = vehicle.pricePerDay;
    const subtotal = dailyRate * days * seasonalMultiplier;

    // Apply promo code discount
    let discount = 0;
    if (promoCode) {
      const promoDoc = await db.collection('promoCodes').doc(promoCode).get();
      if (promoDoc.exists) {
        const promo = promoDoc.data()!;
        if (promo.active && promo.usageLimit > 0) {
          if (promo.percentOff) {
            discount = subtotal * (promo.percentOff / 100);
          } else if (promo.amountOff) {
            discount = promo.amountOff;
          }
        }
      }
    }

    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * 0.24; // 24% VAT for Greece
    const total = afterDiscount + tax;

    return {
      dailyRate,
      days,
      seasonalMultiplier,
      subtotal,
      discount,
      tax,
      total,
      currency: 'EUR',
    };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw new functions.https.HttpsError('internal', 'Failed to calculate price');
  }
});

/**
 * Check vehicle availability for date range
 */
export const checkAvailability = functions.https.onCall(async (data, context) => {
  try {
    const { vehicleId, startDate, endDate } = data;

    if (!vehicleId || !startDate || !endDate) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required fields'
      );
    }

    const start = zonedTimeToUtc(startDate, ATHENS_TZ);
    const end = zonedTimeToUtc(endDate, ATHENS_TZ);

    // Check for overlapping bookings
    const availabilitySnapshot = await db
      .collection('availability')
      .where('vehicleId', '==', vehicleId)
      .where('date', '>=', start)
      .where('date', '<', end)
      .where('status', 'in', ['held', 'booked'])
      .get();

    const isAvailable = availabilitySnapshot.empty;

    return {
      available: isAvailable,
      vehicleId,
      startDate,
      endDate,
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw new functions.https.HttpsError('internal', 'Failed to check availability');
  }
});

/**
 * Reserve a vehicle (create temporary hold with TTL)
 */
export const reserveVehicle = functions.https.onCall(async (data, context) => {
  // Require authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const { vehicleId, startDate, endDate } = data;
    const userId = context.auth.uid;

    // Use transaction for atomicity
    const result = await db.runTransaction(async (transaction) => {
      // Check availability
      const start = zonedTimeToUtc(startDate, ATHENS_TZ);
      const end = zonedTimeToUtc(endDate, ATHENS_TZ);
      const days = differenceInDays(end, start);

      // Create availability records for each day
      const holdRef = db.collection('holds').doc();
      const holdExpires = addDays(new Date(), 0.25); // 6 hours hold

      for (let i = 0; i < days; i++) {
        const date = addDays(start, i);
        const availRef = db.collection('availability').doc();
        
        transaction.set(availRef, {
          vehicleId,
          date,
          status: 'held',
          holdRef: holdRef.id,
          expiresAt: holdExpires,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      // Create hold record
      transaction.set(holdRef, {
        vehicleId,
        userId,
        startDate: start,
        endDate: end,
        expiresAt: holdExpires,
        status: 'active',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return { holdId: holdRef.id, expiresAt: holdExpires };
    });

    return result;
  } catch (error) {
    console.error('Error reserving vehicle:', error);
    throw new functions.https.HttpsError('internal', 'Failed to reserve vehicle');
  }
});

/**
 * Confirm booking (converts hold to booking)
 */
export const confirmBooking = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const { holdId, priceBreakdown, extras } = data;
    const userId = context.auth.uid;

    const result = await db.runTransaction(async (transaction) => {
      // Get hold
      const holdDoc = await transaction.get(db.collection('holds').doc(holdId));
      if (!holdDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Hold not found');
      }

      const hold = holdDoc.data()!;
      if (hold.userId !== userId) {
        throw new functions.https.HttpsError('permission-denied', 'Not authorized');
      }

      // Create booking
      const bookingRef = db.collection('bookings').doc();
      transaction.set(bookingRef, {
        userId,
        vehicleId: hold.vehicleId,
        from: hold.startDate,
        to: hold.endDate,
        extras: extras || [],
        priceBreakdown,
        status: 'confirmed',
        holdId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Update availability records from 'held' to 'booked'
      const availSnapshot = await db
        .collection('availability')
        .where('holdRef', '==', holdId)
        .get();

      availSnapshot.docs.forEach((doc) => {
        transaction.update(doc.ref, {
          status: 'booked',
          bookingRef: bookingRef.id,
        });
      });

      // Mark hold as converted
      transaction.update(holdDoc.ref, { status: 'converted' });

      return { bookingId: bookingRef.id };
    });

    return result;
  } catch (error) {
    console.error('Error confirming booking:', error);
    throw new functions.https.HttpsError('internal', 'Failed to confirm booking');
  }
});

/**
 * Cleanup expired holds (scheduled function)
 */
export const cleanupExpiredHolds = functions.pubsub
  .schedule('every 15 minutes')
  .timeZone(ATHENS_TZ)
  .onRun(async (context) => {
    const now = new Date();
    
    // Find expired holds
    const expiredHolds = await db
      .collection('holds')
      .where('status', '==', 'active')
      .where('expiresAt', '<', now)
      .get();

    const batch = db.batch();
    
    for (const holdDoc of expiredHolds.docs) {
      // Mark hold as expired
      batch.update(holdDoc.ref, { status: 'expired' });
      
      // Free up availability
      const availDocs = await db
        .collection('availability')
        .where('holdRef', '==', holdDoc.id)
        .where('status', '==', 'held')
        .get();
      
      availDocs.docs.forEach((availDoc) => {
        batch.delete(availDoc.ref);
      });
    }
    
    await batch.commit();
    console.log(`Cleaned up ${expiredHolds.size} expired holds`);
  });

/**
 * Webhook handler for payment processing (placeholder)
 */
export const handlePaymentWebhook = functions.https.onRequest(async (req, res) => {
  // TODO: Implement payment provider webhook
  // e.g., Stripe, PayPal, etc.
  
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    // Verify webhook signature
    // Process payment event
    // Update booking status
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Payment webhook error:', error);
    res.status(400).send('Webhook Error');
  }
});
