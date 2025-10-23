import { describe, it, expect } from 'vitest';
import {
  datesOverlap,
  isVehicleAvailable,
  getAvailableVehicles,
  getNextAvailableDate,
} from '../src/engines/availability';

describe('Availability Engine', () => {
  describe('datesOverlap', () => {
    it('should detect overlapping ranges', () => {
      const range1 = {
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-05'),
      };
      const range2 = {
        startDate: new Date('2025-01-03'),
        endDate: new Date('2025-01-07'),
      };

      expect(datesOverlap(range1, range2)).toBe(true);
    });

    it('should detect non-overlapping ranges', () => {
      const range1 = {
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-05'),
      };
      const range2 = {
        startDate: new Date('2025-01-06'),
        endDate: new Date('2025-01-10'),
      };

      expect(datesOverlap(range1, range2)).toBe(false);
    });

    it('should handle adjacent ranges', () => {
      const range1 = {
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-05'),
      };
      const range2 = {
        startDate: new Date('2025-01-05'),
        endDate: new Date('2025-01-10'),
      };

      expect(datesOverlap(range1, range2)).toBe(false);
    });
  });

  describe('isVehicleAvailable', () => {
    const existingBookings = [
      {
        vehicleId: 'v1',
        startDate: new Date('2025-01-10'),
        endDate: new Date('2025-01-15'),
      },
      {
        vehicleId: 'v1',
        startDate: new Date('2025-01-20'),
        endDate: new Date('2025-01-25'),
      },
      {
        vehicleId: 'v2',
        startDate: new Date('2025-01-05'),
        endDate: new Date('2025-01-12'),
      },
    ];

    it('should return true when vehicle is available', () => {
      const requestedRange = {
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-05'),
      };

      expect(isVehicleAvailable('v1', requestedRange, existingBookings)).toBe(true);
    });

    it('should return false when vehicle has overlapping booking', () => {
      const requestedRange = {
        startDate: new Date('2025-01-12'),
        endDate: new Date('2025-01-18'),
      };

      expect(isVehicleAvailable('v1', requestedRange, existingBookings)).toBe(false);
    });

    it('should only check bookings for the specific vehicle', () => {
      const requestedRange = {
        startDate: new Date('2025-01-08'),
        endDate: new Date('2025-01-10'),
      };

      expect(isVehicleAvailable('v1', requestedRange, existingBookings)).toBe(true);
      expect(isVehicleAvailable('v2', requestedRange, existingBookings)).toBe(false);
    });
  });

  describe('getAvailableVehicles', () => {
    const existingBookings = [
      {
        vehicleId: 'v1',
        startDate: new Date('2025-01-10'),
        endDate: new Date('2025-01-15'),
      },
      {
        vehicleId: 'v2',
        startDate: new Date('2025-01-12'),
        endDate: new Date('2025-01-18'),
      },
    ];

    it('should return all available vehicles', () => {
      const requestedRange = {
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-05'),
      };

      const available = getAvailableVehicles(
        ['v1', 'v2', 'v3'],
        requestedRange,
        existingBookings
      );

      expect(available).toEqual(['v1', 'v2', 'v3']);
    });

    it('should filter out unavailable vehicles', () => {
      const requestedRange = {
        startDate: new Date('2025-01-13'),
        endDate: new Date('2025-01-17'),
      };

      const available = getAvailableVehicles(
        ['v1', 'v2', 'v3'],
        requestedRange,
        existingBookings
      );

      expect(available).toEqual(['v3']);
    });
  });

  describe('getNextAvailableDate', () => {
    it('should return fromDate when no bookings exist', () => {
      const fromDate = new Date('2025-01-01');
      const result = getNextAvailableDate('v1', fromDate, []);

      expect(result).toEqual(fromDate);
    });

    it('should return fromDate when it is before first booking', () => {
      const fromDate = new Date('2025-01-01');
      const bookings = [
        {
          vehicleId: 'v1',
          startDate: new Date('2025-01-10'),
          endDate: new Date('2025-01-15'),
        },
      ];

      const result = getNextAvailableDate('v1', fromDate, bookings);
      expect(result).toEqual(fromDate);
    });

    it('should return day after last booking when no gaps exist', () => {
      const fromDate = new Date('2025-01-12');
      const bookings = [
        {
          vehicleId: 'v1',
          startDate: new Date('2025-01-10'),
          endDate: new Date('2025-01-15'),
        },
      ];

      const result = getNextAvailableDate('v1', fromDate, bookings);
      const expected = new Date('2025-01-16');
      expect(result.toISOString()).toBe(expected.toISOString());
    });
  });
});
