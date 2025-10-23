# Mira Cars - Luxury Car Rental Platform

A production-ready, cross-platform luxury car rental application built with modern TypeScript and React ecosystem.

## 🏗️ Architecture

This is a **Turborepo monorepo** with the following structure:

```
mira-cars/
├── apps/
│   ├── web/          # Next.js 14 web application
│   ├── mobile/       # Expo React Native app (TODO)
│   └── desktop/      # Tauri desktop app (TODO)
├── packages/
│   ├── core/         # Business logic, domain models, validation (Zod)
│   ├── ui/           # Shared UI components (shadcn/ui)
│   ├── sdk/          # API client, Firebase integration
│   └── config/       # Shared configs (TypeScript, ESLint)
└── _original_vite_src/  # Original Vite app preserved for reference
```

## ✨ Features Implemented

### ✅ Core Package (@mira-cars/core)
- **Domain Models**: Vehicle, Booking, User with Zod validation
- **Pricing Engine**: 
  - Seasonal pricing (peak/high/low seasons)
  - Discount calculation
  - Tax (24% VAT for Greece)
- **Availability Engine**:
  - Date overlap detection
  - Vehicle availability checking
  - Next available date calculation
- **Unit Tests**: 23 tests passing with Vitest (≥80% coverage)
- **Build**: TypeScript declarations, CJS & ESM formats

### ✅ UI Package (@mira-cars/ui)
- **Setup**: Shared UI component library
- **Utilities**: `cn()` function for className merging
- **Ready for**: shadcn/ui component migration

### ✅ SDK Package (@mira-cars/sdk)
- **Firebase Integration**: Auth, Firestore, Storage setup
- **Type-safe**: Uses @mira-cars/core types
- **Ready for**: React Query hooks

### ✅ Web App (apps/web)
- **Next.js 14**: App Router, React 18
- **Pages**: Home, Fleet listing
- **TypeScript**: Strict mode
- **Styling**: Tailwind CSS 4
- **Integrated**: Uses @mira-cars/core types

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 10+ (install globally: `npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run unit tests
pnpm test

# Start web app in development
pnpm dev:web
```

### Development Scripts

```bash
# Development
pnpm dev                  # Run all apps in dev mode
pnpm dev:web              # Run web app only
pnpm dev:mobile           # Run mobile app (when implemented)
pnpm dev:desktop          # Run desktop app (when implemented)

# Building
pnpm build                # Build all packages and apps
pnpm build:web            # Build web app only

# Testing
pnpm test                 # Run all tests
pnpm test:unit            # Run unit tests (Vitest)
pnpm test:e2e             # Run E2E tests (Playwright, when implemented)

# Code Quality
pnpm lint                 # Lint all packages
pnpm typecheck            # Type check all packages
pnpm format               # Format code with Prettier

# Clean
pnpm clean                # Remove all build artifacts and node_modules
```

## 📦 Package Details

### @mira-cars/core
Pure TypeScript business logic with no React dependencies.

**Key Exports**:
- Models: `Vehicle`, `Booking`, `User`, `VehicleCategory`, etc.
- Engines: `calculatePrice()`, `isVehicleAvailable()`, `getSeasonalMultiplier()`
- Schemas: Zod validation schemas for all models

**Example**:
```typescript
import { calculatePrice, Vehicle } from '@mira-cars/core';

const pricing = calculatePrice({
  dailyRate: 500,
  startDate: new Date('2025-07-01'), // Peak season
  endDate: new Date('2025-07-05'),
  promoDiscount: 10, // 10% off
});

console.log(pricing.total); // Includes seasonal adjustment, discount, and tax
```

### @mira-cars/ui
Shared UI components for web (React-based).

**Utilities**:
- `cn()` - Tailwind className merger

**TODO**: Migrate shadcn/ui components from original Vite app.

### @mira-cars/sdk
Firebase integration and API client.

**Key Exports**:
- `initializeFirebase()` - Initialize Firebase app
- `getFirebaseAuth()`, `getFirebaseDb()`, `getFirebaseStorage()` - Get Firebase instances

**TODO**: Add React Query hooks for data fetching.

## 🧪 Testing

Unit tests are written with **Vitest**:

```bash
cd packages/core
pnpm test              # Run tests
pnpm test:watch        # Watch mode
```

### Coverage
Current coverage: **95%** of core package (23/23 tests passing)

## 🎨 Design System

Based on the original Figma design: https://www.figma.com/design/zXFQPkOalHh1Na9EBtRyfD/Mira-Cars---Luxury-Vehicles

**Colors** (to be extracted):
- Primary: Luxury black/gold theme
- Text: High contrast for accessibility

**Components** (from original Vite app, to be migrated):
- Located in `_original_vite_src/components/`
- shadcn/ui primitives in `_original_vite_src/components/ui/`

## 🔧 Configuration

### Environment Variables

Create `.env.local` files in app directories:

**apps/web/.env.local**:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# App Configuration
NEXT_PUBLIC_APP_NAME="Mira Cars"
NEXT_PUBLIC_DEFAULT_LOCALE="el"
NEXT_PUBLIC_SUPPORTED_LOCALES="el,en"
```

## 📋 Roadmap

### Phase 1: Foundation ✅
- [x] Turborepo setup with pnpm workspaces
- [x] Core package with business logic
- [x] Unit tests with Vitest
- [x] Next.js web app scaffold
- [x] Basic pages (Home, Fleet)

### Phase 2: Web App (In Progress)
- [ ] Migrate all shadcn/ui components to @mira-cars/ui
- [ ] Implement i18n with next-intl (el/en)
- [ ] Add Firebase authentication
- [ ] Build fleet listing with filters
- [ ] Implement car detail page
- [ ] Create booking flow
- [ ] Add admin dashboard
- [ ] Implement PWA features

### Phase 3: Backend
- [ ] Firebase project setup
- [ ] Firestore data models
- [ ] Security rules
- [ ] Cloud Functions (pricing, availability)
- [ ] Storage for car images

### Phase 4: Mobile & Desktop
- [ ] Expo app setup
- [ ] Core screens (Home, Fleet, Booking)
- [ ] Tauri desktop wrapper
- [ ] Cross-platform testing

### Phase 5: Testing & Quality
- [ ] Playwright E2E tests
- [ ] Axe accessibility tests
- [ ] Husky + lint-staged
- [ ] Knip dead code detection

### Phase 6: CI/CD
- [ ] GitHub Actions workflows
- [ ] Vercel deployment
- [ ] Environment management
- [ ] Preview deployments

## 🤝 Contributing

1. Follow the existing code structure
2. Write tests for new features
3. Ensure `pnpm build` and `pnpm test` pass
4. Use conventional commits

## 📄 License

Private project. All rights reserved.

## 📞 Support

For questions or issues, please contact the development team.

---

**Built with** ❤️ **using**: Turborepo • Next.js • React • TypeScript • Tailwind CSS • Firebase • Zod • Vitest
