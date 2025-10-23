import { describe, it, expect } from 'vitest';
import {
  calculateDays,
  calculatePrice,
  getSeasonalMultiplier,
  calculateExtrasPrice,
} from '../src/engines/pricing';

describe('Pricing Engine', () => {
  describe('calculateDays', () => {
    it('should calculate days correctly', () => {
      const start = new Date('2025-01-01');
      const end = new Date('2025-01-05');
      expect(calculateDays(start, end)).toBe(4);
    });

    it('should return at least 1 day for same-day rental', () => {
      const date = new Date('2025-01-01');
      expect(calculateDays(date, date)).toBe(1);
    });

    it('should handle month boundaries', () => {
      const start = new Date('2025-01-30');
      const end = new Date('2025-02-02');
      expect(calculateDays(start, end)).toBe(3);
    });
  });

  describe('getSeasonalMultiplier', () => {
    it('should return 1.3 for peak season (June-September)', () => {
      expect(getSeasonalMultiplier(new Date('2025-06-15'))).toBe(1.3);
      expect(getSeasonalMultiplier(new Date('2025-07-15'))).toBe(1.3);
      expect(getSeasonalMultiplier(new Date('2025-08-15'))).toBe(1.3);
      expect(getSeasonalMultiplier(new Date('2025-09-15'))).toBe(1.3);
    });

    it('should return 1.15 for high season (May, October)', () => {
      expect(getSeasonalMultiplier(new Date('2025-05-15'))).toBe(1.15);
      expect(getSeasonalMultiplier(new Date('2025-10-15'))).toBe(1.15);
    });

    it('should return 1.0 for low season', () => {
      expect(getSeasonalMultiplier(new Date('2025-01-15'))).toBe(1.0);
      expect(getSeasonalMultiplier(new Date('2025-02-15'))).toBe(1.0);
      expect(getSeasonalMultiplier(new Date('2025-03-15'))).toBe(1.0);
      expect(getSeasonalMultiplier(new Date('2025-04-15'))).toBe(1.0);
      expect(getSeasonalMultiplier(new Date('2025-11-15'))).toBe(1.0);
      expect(getSeasonalMultiplier(new Date('2025-12-15'))).toBe(1.0);
    });
  });

  describe('calculatePrice', () => {
    it('should calculate price correctly without discount', () => {
      const result = calculatePrice({
        dailyRate: 100,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-04'),
        seasonalMultiplier: 1.0,
      });

      expect(result.totalDays).toBe(3);
      expect(result.dailyRate).toBe(100);
      expect(result.subtotal).toBe(300);
      expect(result.discount).toBe(0);
      expect(result.tax).toBe(72); // 24% of 300
      expect(result.total).toBe(372);
    });

    it('should apply seasonal multiplier', () => {
      const result = calculatePrice({
        dailyRate: 100,
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-04'),
        seasonalMultiplier: 1.3,
      });

      expect(result.dailyRate).toBe(130);
      expect(result.subtotal).toBe(390); // 130 * 3
    });

    it('should apply discount correctly', () => {
      const result = calculatePrice({
        dailyRate: 100,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-04'),
        promoDiscount: 10, // 10%
        seasonalMultiplier: 1.0,
      });

      expect(result.subtotal).toBe(300);
      expect(result.discount).toBe(30); // 10% of 300
      expect(result.tax).toBe(64.8); // 24% of 270
      expect(result.total).toBe(334.8);
    });

    it('should use automatic seasonal pricing when not provided', () => {
      const result = calculatePrice({
        dailyRate: 100,
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-07-04'),
      });

      expect(result.dailyRate).toBe(130); // 1.3x for peak season
    });
  });

  describe('calculateExtrasPrice', () => {
    it('should calculate extras total correctly', () => {
      const extras = [
        { price: 20, quantity: 2 },
        { price: 15, quantity: 1 },
        { price: 10 }, // no quantity defaults to 1
      ];

      expect(calculateExtrasPrice(extras)).toBe(65); // 40 + 15 + 10
    });

    it('should handle empty extras', () => {
      expect(calculateExtrasPrice([])).toBe(0);
    });
  });
});
