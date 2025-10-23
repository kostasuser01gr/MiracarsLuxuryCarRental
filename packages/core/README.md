# @mira-cars/core

Core business logic and domain models for the Mira Cars platform.

This package contains pure TypeScript logic with no framework dependencies, making it reusable across web, mobile, and desktop apps.

## Features

- **Domain Models** with Zod validation
  - Vehicle
  - Booking
  - User
- **Pricing Engine**
  - Seasonal pricing calculation
  - Discount application
  - Tax calculation (24% VAT)
- **Availability Engine**
  - Date overlap detection
  - Vehicle availability checking
  - Next available date calculation

## Usage

```typescript
import { 
  Vehicle, 
  calculatePrice, 
  isVehicleAvailable 
} from '@mira-cars/core';

// Calculate pricing
const pricing = calculatePrice({
  dailyRate: 500,
  startDate: new Date('2025-07-01'),
  endDate: new Date('2025-07-05'),
  promoDiscount: 10,
});

console.log(pricing.total); // Total with taxes and discounts

// Check availability
const available = isVehicleAvailable(
  'vehicle-id',
  { startDate: new Date(), endDate: new Date() },
  existingBookings
);
```

## Testing

```bash
pnpm test              # Run tests
pnpm test:watch        # Watch mode
```

## Building

```bash
pnpm build
```

Outputs:
- `dist/index.js` - CommonJS
- `dist/index.mjs` - ES Module
- `dist/index.d.ts` - TypeScript declarations
