# @mira-cars/sdk

API client and Firebase integration for Mira Cars platform.

## Features

- **Firebase Integration**
  - Authentication
  - Firestore database
  - Storage
- **Type-safe**: Uses @mira-cars/core domain models
- **Ready for**: React Query hooks

## Usage

```typescript
import { initializeFirebase } from '@mira-cars/sdk';

// Initialize Firebase
const { auth, db, storage } = initializeFirebase({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
});

// Use Firebase instances
// auth - for authentication
// db - for Firestore
// storage - for file storage
```

## Development

```bash
pnpm dev     # Watch mode
pnpm build   # Production build
```

## Roadmap

- [ ] React Query hooks for vehicles
- [ ] React Query hooks for bookings
- [ ] React Query hooks for users
- [ ] Authentication helpers
- [ ] Error handling utilities
