# Environment Variables

This document describes all environment variables used across the Mira Cars platform.

## Web Application (apps/web)

Create `.env.local` in `apps/web/`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Application Configuration
NEXT_PUBLIC_APP_NAME="Mira Cars"
NEXT_PUBLIC_DEFAULT_LOCALE="el"
NEXT_PUBLIC_SUPPORTED_LOCALES="el,en"
NEXT_PUBLIC_SITE_URL="https://miracars.gr"

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Google Maps (for location features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
```

## Mobile Application (apps/mobile)

Create `.env.local` in `apps/mobile/`:

```env
# Firebase Configuration (for Expo)
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id

# Application Configuration
EXPO_PUBLIC_APP_NAME="Mira Cars"
EXPO_PUBLIC_API_URL="https://api.miracars.gr"
```

## CI/CD Environment Variables

### GitHub Actions Secrets

Configure these in your repository settings (Settings > Secrets and variables > Actions):

```
# Vercel Deployment
VERCEL_TOKEN              # Vercel API token
VERCEL_ORG_ID             # Vercel organization ID
VERCEL_PROJECT_ID         # Vercel project ID

# Firebase (optional for CI deployment)
FIREBASE_TOKEN            # Firebase CI token (firebase login:ci)

# Optional: Code Quality
SONAR_TOKEN               # SonarCloud token (if using)
```

### Vercel Environment Variables

Configure these in Vercel Dashboard (Project Settings > Environment Variables):

```
# Enable Corepack for pnpm
ENABLE_EXPERIMENTAL_COREPACK=1

# Firebase (same as web app)
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# Site Configuration
NEXT_PUBLIC_SITE_URL         # https://miracars.gr for production
NEXT_PUBLIC_APP_NAME
NEXT_PUBLIC_DEFAULT_LOCALE
NEXT_PUBLIC_SUPPORTED_LOCALES
```

## Firebase Functions Environment Variables

Set using Firebase CLI:

```bash
# Development
firebase functions:config:set app.name="Mira Cars"
firebase functions:config:set app.timezone="Europe/Athens"
firebase functions:config:set app.currency="EUR"

# Email Service (e.g., SendGrid)
firebase functions:config:set sendgrid.api_key="your-sendgrid-key"

# Payment Provider (e.g., Stripe)
firebase functions:config:set stripe.secret_key="your-stripe-secret"
firebase functions:config:set stripe.webhook_secret="your-webhook-secret"
```

View current config:
```bash
firebase functions:config:get
```

## Getting Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon > Project settings
4. Scroll down to "Your apps"
5. Select your web app or create one
6. Copy the configuration values

## Security Notes

1. **Never commit** `.env.local` files to version control
2. **Use different** Firebase projects for development and production
3. **Rotate secrets** regularly in production
4. **Limit API keys** to specific domains in Firebase Console
5. **Enable App Check** in Firebase for production

## Environment Variable Patterns

### Public vs Private

- `NEXT_PUBLIC_*` - Exposed to browser (client-side)
- `EXPO_PUBLIC_*` - Exposed to Expo app (client-side)
- No prefix - Server-side only (Next.js API routes, Functions)

### Best Practices

- Use `.env.local` for local development (git ignored)
- Use `.env.production` for production values (git ignored)
- Use `.env.sample` as a template (committed to git)
- Document all variables in this file
- Validate required variables at app startup

## Validation

Add runtime validation in your app:

```typescript
// apps/web/src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  // ... other required variables
});

export const env = envSchema.parse({
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... other variables
});
```

## Local Development Checklist

- [ ] Copy `.env.sample` to `.env.local` in each app directory
- [ ] Fill in Firebase configuration values
- [ ] Set `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000`
- [ ] Verify all required variables are set
- [ ] Test that the app starts without errors
