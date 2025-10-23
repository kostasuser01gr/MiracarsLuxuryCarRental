import { z } from 'zod';

// Booking Status
export const BookingStatusSchema = z.enum([
  'pending',
  'confirmed',
  'active',
  'completed',
  'cancelled',
]);

export type BookingStatus = z.infer<typeof BookingStatusSchema>;

// Driver Info
export const DriverInfoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  licenseNumber: z.string().optional(),
  licenseExpiry: z.date().optional(),
});

export type DriverInfo = z.infer<typeof DriverInfoSchema>;

// Booking Extra
export const BookingExtraSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive().default(1),
});

export type BookingExtra = z.infer<typeof BookingExtraSchema>;

// Booking Model
export const BookingSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  customerId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  driver: DriverInfoSchema,
  extras: z.array(BookingExtraSchema).optional(),
  totalDays: z.number().int().positive(),
  dailyRate: z.number().positive(),
  extrasTotal: z.number().nonnegative().default(0),
  subtotal: z.number().positive(),
  tax: z.number().nonnegative().default(0),
  total: z.number().positive(),
  status: BookingStatusSchema,
  promoCode: z.string().optional(),
  discount: z.number().nonnegative().default(0),
  notes: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Booking = z.infer<typeof BookingSchema>;

// Create Booking
export const CreateBookingSchema = BookingSchema.omit({
  id: true,
  totalDays: true,
  subtotal: true,
  tax: true,
  total: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateBooking = z.infer<typeof CreateBookingSchema>;
