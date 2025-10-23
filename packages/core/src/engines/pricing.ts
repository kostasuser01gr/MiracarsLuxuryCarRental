/**
 * Pricing Engine
 * Pure functions for calculating rental prices
 */

export interface PricingParams {
  dailyRate: number;
  startDate: Date;
  endDate: Date;
  promoDiscount?: number;
  seasonalMultiplier?: number;
}

export interface PricingResult {
  totalDays: number;
  dailyRate: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

const TAX_RATE = 0.24; // 24% VAT for Greece
const MIN_RENTAL_DAYS = 1;

/**
 * Calculate the number of days between two dates
 */
export function calculateDays(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Reset time to start of day for accurate day calculation
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(diffDays, MIN_RENTAL_DAYS);
}

/**
 * Get seasonal price multiplier based on date
 * Peak season (June-September): 1.3x
 * High season (May, October): 1.15x
 * Low season (rest): 1.0x
 */
export function getSeasonalMultiplier(date: Date): number {
  const month = date.getMonth(); // 0-11
  
  // Peak season: June (5) - September (8)
  if (month >= 5 && month <= 8) {
    return 1.3;
  }
  
  // High season: May (4), October (9)
  if (month === 4 || month === 9) {
    return 1.15;
  }
  
  // Low season
  return 1.0;
}

/**
 * Calculate total price for a booking
 */
export function calculatePrice(params: PricingParams): PricingResult {
  const { dailyRate, startDate, endDate, promoDiscount = 0, seasonalMultiplier } = params;
  
  // Calculate days
  const totalDays = calculateDays(startDate, endDate);
  
  // Apply seasonal pricing if not provided
  const multiplier = seasonalMultiplier ?? getSeasonalMultiplier(startDate);
  const adjustedDailyRate = dailyRate * multiplier;
  
  // Calculate subtotal
  const subtotal = adjustedDailyRate * totalDays;
  
  // Apply discount
  const discount = Math.min(subtotal * (promoDiscount / 100), subtotal);
  
  // Calculate tax (on amount after discount)
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * TAX_RATE;
  
  // Calculate total
  const total = taxableAmount + tax;
  
  return {
    totalDays,
    dailyRate: adjustedDailyRate,
    subtotal,
    discount,
    tax,
    total,
  };
}

/**
 * Calculate price for extras
 */
export function calculateExtrasPrice(extras: Array<{ price: number; quantity?: number }>): number {
  return extras.reduce((sum, extra) => {
    return sum + extra.price * (extra.quantity || 1);
  }, 0);
}
