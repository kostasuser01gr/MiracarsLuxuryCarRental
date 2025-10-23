# Architecture Overview

This document provides a high-level overview of the Mira Cars platform architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────┬──────────────────┬────────────────────────────┤
│   Web (Next.js) │  Mobile (Expo)   │  Desktop (Tauri)           │
│   - SSG/SSR     │  - Native feel   │  - Native shell            │
│   - PWA         │  - iOS/Android   │  - Windows/Mac/Linux       │
│   - i18n        │  - Offline       │  - Auto-update             │
└─────────────────┴──────────────────┴────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SHARED PACKAGES                              │
├──────────────────┬───────────────────┬──────────────────────────┤
│  @mira-cars/core │  @mira-cars/ui    │  @mira-cars/sdk          │
│  - Business      │  - Components     │  - Firebase client       │
│  - Validation    │  - Utilities      │  - API hooks             │
│  - Pure TS       │  - Styling        │  - Type-safe             │
└──────────────────┴───────────────────┴──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Firebase)                          │
├──────────────────┬───────────────────┬──────────────────────────┤
│  Firestore       │  Cloud Functions  │  Storage                 │
│  - Vehicles      │  - Pricing        │  - Vehicle images        │
│  - Bookings      │  - Availability   │  - Documents             │
│  - Users         │  - Reservations   │  - Driver licenses       │
└──────────────────┴───────────────────┴──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
├──────────────────┬───────────────────┬──────────────────────────┤
│  Vercel          │  CDN              │  Payment Provider        │
│  - Hosting       │  - Images         │  - Stripe/PayPal         │
│  - Edge network  │  - Static assets  │  - Webhooks              │
└──────────────────┴───────────────────┴──────────────────────────┘
```

## Monorepo Structure

### Apps

#### `apps/web` - Next.js 14 Application
**Purpose**: Primary web interface for customers and admins

**Tech Stack**:
- Next.js 14 (App Router)
- React 18
- TypeScript (strict)
- Tailwind CSS 4
- next-intl (i18n)

**Features**:
- Static Site Generation (SSG)
- Server-Side Rendering (SSR)
- International routing (el, en)
- PWA capabilities
- SEO optimization

**Routes**:
- `[locale]/` - Home page
- `[locale]/fleet` - Vehicle listings
- `[locale]/booking` - Booking flow
- `[locale]/account` - User dashboard
- `[locale]/admin` - Admin panel

#### `apps/mobile` - Expo Application
**Purpose**: Native mobile experience for iOS and Android

**Tech Stack**:
- Expo 51
- React Native
- Expo Router
- React Query

**Screens**:
- Home tab
- Fleet tab
- Bookings tab
- Profile tab
- Vehicle details (modal)

**Features**:
- File-based routing
- Native navigation
- Offline support
- Push notifications (ready)

#### `apps/desktop` - Tauri Application
**Purpose**: Native desktop application

**Tech Stack**:
- Tauri 1.5 (Rust)
- Wraps web application
- System tray integration

**Platforms**:
- Windows (MSI installer)
- macOS (DMG installer)
- Linux (AppImage/deb/rpm)

### Packages

#### `packages/core` - Business Logic
**Purpose**: Pure TypeScript business rules and domain models

**Exports**:
```typescript
// Models
export type Vehicle = { ... };
export type Booking = { ... };
export type User = { ... };

// Schemas (Zod)
export const vehicleSchema = z.object({ ... });
export const bookingSchema = z.object({ ... });

// Engines
export function calculatePrice(data: PricingData): PricingResult;
export function isVehicleAvailable(vehicle: string, dates: DateRange): boolean;
export function getSeasonalMultiplier(date: Date): number;
```

**Key Features**:
- Zero dependencies (pure TypeScript)
- Zod schemas for runtime validation
- 95% unit test coverage
- Deterministic functions
- Side-effect free

#### `packages/ui` - Component Library
**Purpose**: Shared React components for web applications

**Structure**:
```typescript
export { cn } from './lib/utils';
// Future: shadcn/ui components
// export { Button, Card, Input, ... } from './components';
```

**Design System**:
- Tailwind CSS integration
- Radix UI primitives (planned)
- Framer Motion animations
- Dark mode support

#### `packages/sdk` - Firebase SDK
**Purpose**: Type-safe Firebase integration

**Exports**:
```typescript
export function initializeFirebase(config: FirebaseConfig): void;
export function getFirebaseAuth(): Auth;
export function getFirebaseDb(): Firestore;
export function getFirebaseStorage(): FirebaseStorage;

// Future: React Query hooks
// export function useVehicles();
// export function useBookings();
```

#### `packages/config` - Shared Configuration
**Purpose**: Centralized configuration for TypeScript, ESLint

**Files**:
- `typescript/base.json` - Base TS config
- `typescript/nextjs.json` - Next.js specific
- `typescript/react.json` - React specific

## Data Flow

### Booking Flow

```
User Action → Web/Mobile UI
    ↓
  Validation (Zod schemas from @mira-cars/core)
    ↓
  Firebase Client (@mira-cars/sdk)
    ↓
  Cloud Function (reserveVehicle)
    ↓
  Firestore Transaction
    ├─ Check availability
    ├─ Create hold (6-hour TTL)
    └─ Update availability records
    ↓
  Response to Client
    ↓
  UI Update (React Query cache)
```

### Data Fetching

**Web (Next.js)**:
- SSG at build time for static pages
- ISR for dynamic content with revalidation
- Client-side fetch for user-specific data

**Mobile (Expo)**:
- React Query for caching
- Optimistic updates
- Offline queue

**Pattern**:
```typescript
// Server Component (Next.js)
async function VehicleList() {
  const vehicles = await fetchVehicles(); // Direct Firebase
  return <div>{/* ... */}</div>;
}

// Client Component (React Query)
function UserBookings() {
  const { data } = useBookings(); // Via React Query
  return <div>{/* ... */}</div>;
}
```

## Security Architecture

### Authentication
- Firebase Authentication
- Email/password + OAuth providers
- JWT tokens
- Secure session management

### Authorization Layers

**1. Firestore Security Rules**:
```javascript
// Role-based access
match /bookings/{bookingId} {
  allow read: if isOwner(resource.data.userId) || isStaff();
  allow create: if isAuthenticated();
}
```

**2. Cloud Functions**:
```typescript
export const confirmBooking = onCall((data, context) => {
  // Verify authentication
  if (!context.auth) throw new HttpsError('unauthenticated');
  
  // Verify ownership
  if (booking.userId !== context.auth.uid) {
    throw new HttpsError('permission-denied');
  }
  
  // Process booking...
});
```

**3. Frontend Guards**:
```typescript
// Middleware (Next.js)
export function middleware(request) {
  const session = await getSession();
  if (!session) return NextResponse.redirect('/login');
}

// Component guards
if (!user) return <LoginPrompt />;
if (user.role !== 'admin') return <Forbidden />;
```

### Data Protection

**Storage Rules**:
- Vehicle images: Public read, staff write
- User documents: Private (owner + staff only)
- Driver licenses: Encrypted, owner + staff only

**Network Security**:
- HTTPS only
- Security headers (CSP, HSTS, X-Frame-Options)
- CORS configuration
- Rate limiting (via Firebase)

## Performance Optimization

### Web Application

**Static Generation**:
- All marketing pages pre-rendered
- Vehicle listings cached with ISR
- Sitemap generated at build time

**Image Optimization**:
- Next.js Image component
- AVIF & WebP formats
- Lazy loading
- Responsive images

**Code Splitting**:
- Route-based splitting (automatic)
- Dynamic imports for heavy components
- Vendor chunks optimization

### Mobile Application

**Bundle Size**:
- Tree shaking
- Hermes engine (React Native)
- Native modules on-demand

**Performance**:
- React Native optimization
- FlatList for long lists
- Memo and useMemo strategically

### Caching Strategy

**Build-time**:
- Static pages (infinite cache)
- Vehicle images (1 year)

**Runtime**:
- React Query (5 minutes stale time)
- Firebase local persistence
- Service Worker (PWA)

## Deployment Pipeline

```
Developer → Git Push
    ↓
GitHub Actions CI
    ├─ Typecheck
    ├─ Lint
    ├─ Unit tests
    ├─ E2E tests
    └─ Build
    ↓
[If main/develop branch]
    ↓
Vercel Deployment
    ├─ Build Next.js
    ├─ Deploy to Edge
    └─ Invalidate cache
    ↓
Firebase Deployment
    ├─ Deploy Functions
    ├─ Deploy Rules
    └─ Deploy Indexes
    ↓
[Production Live]
```

### Environments

- **Development**: Local (localhost:3000)
- **Preview**: Per-PR deployment (Vercel)
- **Staging**: Firebase staging project
- **Production**: Firebase production project + Vercel

## Monitoring & Observability

### Metrics

**Vercel Analytics**:
- Web Vitals (LCP, FID, CLS)
- Page views
- Unique visitors
- Geographic distribution

**Firebase**:
- Function execution time
- Error rates
- Database reads/writes
- Storage bandwidth

**Custom Events**:
- Booking started
- Booking completed
- Vehicle viewed
- Search performed

### Error Tracking

**Client-side**:
- Error boundaries (React)
- Console errors captured
- Network failures logged

**Server-side**:
- Cloud Function errors
- Database transaction failures
- Integration errors

### Logging

**Structured Logging**:
```typescript
logger.info('Booking created', {
  bookingId,
  userId,
  vehicleId,
  amount,
  timestamp,
});
```

**Log Levels**:
- ERROR: System failures
- WARN: Degraded performance
- INFO: Business events
- DEBUG: Development only

## Scalability Considerations

### Database
- Firestore auto-scales
- Indexes for common queries
- Composite indexes for complex filters
- Denormalization for read performance

### Functions
- Stateless (horizontal scaling)
- Connection pooling
- Caching with TTL
- Rate limiting

### CDN
- Vercel Edge Network (global)
- Image CDN (Vercel/Firebase)
- Static asset caching

### Future Optimizations
- Redis for session storage
- ElasticSearch for advanced search
- GraphQL for flexible queries
- Event-driven architecture

## Technology Decisions

### Why Next.js?
- Best-in-class SSR/SSG
- Image optimization
- File-based routing
- Edge runtime support
- Great DX

### Why Expo?
- Unified iOS/Android development
- OTA updates
- Managed workflow
- Native module access
- Strong ecosystem

### Why Tauri?
- Lightweight (~3MB vs 80MB Electron)
- Security-first
- Rust performance
- Cross-platform
- Web technology reuse

### Why Firebase?
- Managed infrastructure
- Real-time updates
- Offline support
- Authentication built-in
- Predictable scaling

### Why Turborepo?
- Monorepo orchestration
- Incremental builds
- Remote caching
- Task pipelines
- Great DX

## Future Architecture

### Planned Enhancements

**Microservices** (if needed):
- Payment service (separate)
- Notification service
- Analytics service

**Event Sourcing**:
- Booking state machine
- Audit log
- Time-travel debugging

**GraphQL API**:
- Replace REST
- Better type safety
- Reduced over-fetching

**Real-time Features**:
- Live availability updates
- Chat support
- Admin notifications

## Conclusion

This architecture provides:
- ✅ Scalability
- ✅ Maintainability
- ✅ Performance
- ✅ Security
- ✅ Developer experience

The monorepo structure allows for code sharing while maintaining clear boundaries. The Firebase backend provides a solid foundation that can scale to thousands of concurrent users without infrastructure management.
