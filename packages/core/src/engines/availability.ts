/**
 * Availability Engine
 * Pure functions for checking vehicle availability
 */

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface BookingSlot extends DateRange {
  vehicleId: string;
}

/**
 * Check if two date ranges overlap
 */
export function datesOverlap(range1: DateRange, range2: DateRange): boolean {
  return range1.startDate < range2.endDate && range1.endDate > range2.startDate;
}

/**
 * Check if a vehicle is available for a given date range
 */
export function isVehicleAvailable(
  vehicleId: string,
  requestedRange: DateRange,
  existingBookings: BookingSlot[]
): boolean {
  // Filter bookings for this vehicle
  const vehicleBookings = existingBookings.filter((b) => b.vehicleId === vehicleId);
  
  // Check if requested range overlaps with any existing booking
  return !vehicleBookings.some((booking) => datesOverlap(requestedRange, booking));
}

/**
 * Get all available vehicles for a date range
 */
export function getAvailableVehicles(
  vehicleIds: string[],
  requestedRange: DateRange,
  existingBookings: BookingSlot[]
): string[] {
  return vehicleIds.filter((vehicleId) =>
    isVehicleAvailable(vehicleId, requestedRange, existingBookings)
  );
}

/**
 * Get next available date for a vehicle
 */
export function getNextAvailableDate(
  vehicleId: string,
  fromDate: Date,
  existingBookings: BookingSlot[]
): Date {
  const vehicleBookings = existingBookings
    .filter((b) => b.vehicleId === vehicleId)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  
  // If no bookings or requested date is before first booking, return fromDate
  if (vehicleBookings.length === 0 || fromDate < vehicleBookings[0].startDate) {
    return fromDate;
  }
  
  // Find the first gap or return the day after the last booking
  for (let i = 0; i < vehicleBookings.length; i++) {
    const booking = vehicleBookings[i];
    
    if (fromDate < booking.startDate) {
      return fromDate;
    }
    
    // Check gap between this booking and next
    if (i < vehicleBookings.length - 1) {
      const nextBooking = vehicleBookings[i + 1];
      const gapStart = new Date(booking.endDate);
      gapStart.setDate(gapStart.getDate() + 1);
      
      if (gapStart < nextBooking.startDate) {
        return gapStart;
      }
    }
  }
  
  // Return day after last booking
  const lastBooking = vehicleBookings[vehicleBookings.length - 1];
  const nextAvailable = new Date(lastBooking.endDate);
  nextAvailable.setDate(nextAvailable.getDate() + 1);
  
  return nextAvailable;
}
