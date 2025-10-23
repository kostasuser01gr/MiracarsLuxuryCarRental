# Mira Cars - Luxury Car Rental Platform

[![CI](https://github.com/kostasuser01gr/MiracarsLuxuryCarRental/actions/workflows/ci.yml/badge.svg)](https://github.com/kostasuser01gr/MiracarsLuxuryCarRental/actions/workflows/ci.yml)

A **production-ready, cross-platform** luxury car rental application built with modern TypeScript and the React ecosystem. Features web (Next.js), mobile (Expo), and desktop (Tauri) applications sharing common business logic.

## 🚀 Quick Start

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev:web

# Run tests
pnpm test

# Build for production
pnpm build
```

## 🏗️ Architecture

This is a **Turborepo monorepo** with pnpm workspaces:

```
mira-cars-monorepo/
├── apps/
│   ├── web/              # Next.js 14 App Router (SSG, i18n, PWA)
│   ├── mobile/           # Expo with Expo Router
│   └── desktop/          # Tauri wrapping web app
├── packages/
│   ├── core/             # Business logic, pricing, availability (pure TypeScript)
│   ├── ui/               # Shared UI components library
│   ├── sdk/              # Firebase SDK & API client
│   └── config/           # Shared ESLint, TypeScript configs
├── firebase/
│   └── functions/        # Cloud Functions for booking orchestration
├── e2e/                  # Playwright E2E tests
├── _original_vite_src/   # Original Vite app (preserved for reference)
├── vercel.json           # Vercel deployment config
├── firebase.json         # Firebase project config
├── firestore.rules       # Firestore security rules
├── storage.rules         # Firebase Storage rules
└── playwright.config.ts  # E2E test configuration
```

## ✨ Features

### 🌐 Web Application (Next.js 14)
- **Internationalization**: Greek (el) and English (en) with next-intl
- **PWA**: Progressive Web App with offline support ready
- **SEO**: Dynamic sitemap, robots.txt, OpenGraph, Twitter Cards
- **Performance**: Static Site Generation (SSG), Image optimization
- **Pages**: Home, Fleet, Booking, Account, Admin
- **Accessibility**: WCAG 2.2 AA compliant

### 📱 Mobile Application (Expo)
- **Expo Router**: File-based routing with type safety
- **Tab Navigation**: Home, Fleet, Bookings, Profile
- **Cross-platform**: iOS, Android, Web support
- **Firebase Ready**: Authentication and data integration

### 🖥️ Desktop Application (Tauri)
- **Native Performance**: Rust backend with web frontend
- **Cross-platform**: Windows, macOS, Linux
- **Small Bundle**: ~3MB installer
- **Auto-update Ready**: Update mechanism scaffolded

### 📦 Shared Packages

#### @mira-cars/core
- **Pricing Engine**: Seasonal pricing, discounts, 24% VAT
- **Availability Engine**: Date overlap detection, booking conflicts
- **Domain Models**: Vehicle, Booking, User with Zod validation
- **Pure TypeScript**: Zero framework dependencies
- **Tested**: 23/23 unit tests passing (95% coverage)

#### @mira-cars/ui
- **Component Library**: Shared React components
- **Utilities**: className merging, theme utilities
- **Tailwind**: Ready for shadcn/ui integration

#### @mira-cars/sdk
- **Firebase**: Auth, Firestore, Storage, Functions
- **Type-safe**: Uses @mira-cars/core types
- **Ready for**: React Query hooks integration

### ☁️ Firebase Backend
- **Cloud Functions**: Booking orchestration, pricing, availability
- **Firestore**: NoSQL database with security rules
- **Storage**: Secure file storage for images and documents
- **Authentication**: Ready for user management
- **Timezone**: Europe/Athens, Currency: EUR

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 10+ (via Corepack, comes with Node.js 16.9+)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/kostasuser01gr/MiracarsLuxuryCarRental.git
cd MiracarsLuxuryCarRental

# Enable pnpm with Corepack
corepack enable
corepack prepare pnpm@10.19.0 --activate

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run unit tests
pnpm test

# Start web app in development
pnpm dev:web
```

### 📚 Documentation

- **[Environment Variables](./ENVIRONMENT.md)** - Configuration guide for all apps
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to Vercel, Expo, Firebase, Tauri
- **[Contributing](./CONTRIBUTING.md)** - Development workflow and guidelines
- **[E2E Testing](./e2e/README.md)** - Playwright test guide and best practices
- **[Mobile App](./apps/mobile/README.md)** - Expo mobile app documentation
- **[Desktop App](./apps/desktop/README.md)** - Tauri desktop app documentation

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
