# Deployment Guide

This guide covers deploying all components of the Mira Cars platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Web App (Vercel)](#web-app-vercel)
- [Mobile App (Expo)](#mobile-app-expo)
- [Desktop App (Tauri)](#desktop-app-tauri)
- [Firebase Backend](#firebase-backend)
- [Environment Configuration](#environment-configuration)
- [CI/CD](#cicd)

## Prerequisites

- **Node.js** 20+ and pnpm 10+ installed
- **Firebase CLI**: `npm install -g firebase-tools`
- **Vercel CLI** (optional): `npm install -g vercel`
- **EAS CLI** (for mobile): `npm install -g eas-cli`
- **Rust** (for desktop): https://rustup.rs/

## Web App (Vercel)

### Automatic Deployment (Recommended)

The web app deploys automatically via GitHub integration:

1. **Connect Repository** to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import `kostasuser01gr/MiracarsLuxuryCarRental`
   - Vercel will detect Next.js automatically

2. **Configure Build Settings**:
   - Framework Preset: `Next.js`
   - Root Directory: `apps/web`
   - Build Command: Leave empty (uses `vercel.json`)
   - Install Command: Leave empty (uses `vercel.json`)
   - Output Directory: `.next`

3. **Add Environment Variables** (see [ENVIRONMENT.md](./ENVIRONMENT.md)):
   ```
   ENABLE_EXPERIMENTAL_COREPACK=1
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_APP_NAME="Mira Cars"
   NEXT_PUBLIC_DEFAULT_LOCALE="el"
   NEXT_PUBLIC_SUPPORTED_LOCALES="el,en"
   ```

4. **Deploy**:
   - Push to `main` branch → Production deployment
   - Open PR → Preview deployment with unique URL
   - GitHub Actions will run tests before deployment

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from repository root)
vercel

# Deploy to production
vercel --prod
```

### Custom Domain

1. Go to Vercel Project Settings > Domains
2. Add your domain (e.g., `miracars.gr`)
3. Configure DNS records as instructed
4. Enable automatic HTTPS

## Mobile App (Expo)

### Development Build (Local)

```bash
# Android
pnpm --filter=mobile android

# iOS (macOS only)
pnpm --filter=mobile ios
```

### Production Build with EAS

1. **Setup EAS**:
   ```bash
   # Login to Expo
   eas login
   
   # Configure EAS
   cd apps/mobile
   eas build:configure
   ```

2. **Configure `eas.json`** (create if not exists):
   ```json
   {
     "build": {
       "production": {
         "android": {
           "buildType": "apk"
         },
         "ios": {
           "buildType": "release"
         }
       },
       "preview": {
         "distribution": "internal"
       }
     },
     "submit": {
       "production": {
         "android": {
           "serviceAccountKeyPath": "./google-service-account.json"
         },
         "ios": {
           "appleId": "your-apple-id@example.com",
           "ascAppId": "1234567890"
         }
       }
     }
   }
   ```

3. **Build for Android**:
   ```bash
   # Build APK
   eas build --platform android --profile production
   
   # Build AAB for Play Store
   eas build --platform android --profile production
   ```

4. **Build for iOS** (requires Apple Developer account):
   ```bash
   eas build --platform ios --profile production
   ```

5. **Submit to Stores**:
   ```bash
   # Android
   eas submit --platform android
   
   # iOS
   eas submit --platform ios
   ```

### Alternative: Local Builds

```bash
cd apps/mobile

# Generate native code
npx expo prebuild

# Build Android
npx expo run:android --variant release

# Build iOS
npx expo run:ios --configuration Release
```

## Desktop App (Tauri)

### Prerequisites

Install platform-specific dependencies:

**macOS**:
```bash
xcode-select --install
```

**Windows**:
- Install Microsoft Visual Studio C++ Build Tools

**Linux**:
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

### Build

```bash
# Build web app first
pnpm build:web

# Build desktop app
pnpm build:desktop
```

**Output locations**:
- **macOS**: `apps/desktop/src-tauri/target/release/bundle/dmg/`
- **Windows**: `apps/desktop/src-tauri/target/release/bundle/msi/`
- **Linux**: `apps/desktop/src-tauri/target/release/bundle/deb/` or `appimage/`

### Code Signing

**macOS**:
```bash
# Sign the app
codesign --force --deep --sign "Developer ID Application: Your Name" \
  apps/desktop/src-tauri/target/release/bundle/macos/Mira\ Cars.app
```

**Windows**:
- Configure certificate in `tauri.conf.json` under `bundle.windows.certificateThumbprint`

### Distribution

- **macOS**: Distribute DMG or notarize for Gatekeeper
- **Windows**: Distribute MSI installer
- **Linux**: Distribute AppImage, deb, or rpm

## Firebase Backend

### Initial Setup

1. **Create Firebase Project**:
   ```bash
   firebase login
   firebase projects:create mira-cars-prod
   firebase use mira-cars-prod
   ```

2. **Enable Services**:
   - Authentication (Email/Password, Google, etc.)
   - Firestore Database
   - Storage
   - Functions

3. **Deploy Firestore Rules**:
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only firestore:indexes
   ```

4. **Deploy Storage Rules**:
   ```bash
   firebase deploy --only storage
   ```

5. **Deploy Cloud Functions**:
   ```bash
   cd firebase/functions
   npm install
   npm run build
   cd ../..
   firebase deploy --only functions
   ```

### Update Deployment

```bash
# Deploy everything
firebase deploy

# Deploy specific services
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase deploy --only storage
```

### Multiple Environments

```bash
# Development
firebase use dev
firebase deploy

# Staging
firebase use staging
firebase deploy

# Production
firebase use production
firebase deploy --only functions:production
```

### Function Configuration

```bash
# Set environment variables
firebase functions:config:set sendgrid.api_key="your-key"
firebase functions:config:set stripe.secret_key="your-key"

# View configuration
firebase functions:config:get

# Deploy with new config
firebase deploy --only functions
```

## Environment Configuration

See [ENVIRONMENT.md](./ENVIRONMENT.md) for detailed environment variable setup.

### Quick Checklist

- [ ] Firebase project created and configured
- [ ] Vercel project connected to GitHub
- [ ] Environment variables set in Vercel
- [ ] Firebase security rules deployed
- [ ] Cloud Functions deployed
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS enabled
- [ ] Analytics configured

## CI/CD

### GitHub Actions

The repository includes two workflows:

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Runs on every push and PR
   - Type checking, linting, testing
   - Build verification
   - Runs automatically

2. **Preview Workflow** (`.github/workflows/preview.yml`):
   - Creates Vercel preview deployments for PRs
   - Requires Vercel secrets configured
   - Comments PR with preview URL

### Required Secrets

Configure in GitHub (Settings > Secrets and variables > Actions):

```
VERCEL_TOKEN          # From Vercel Dashboard > Settings > Tokens
VERCEL_ORG_ID         # From Vercel project settings
VERCEL_PROJECT_ID     # From Vercel project settings
FIREBASE_TOKEN        # Run: firebase login:ci
```

### Manual Trigger

```bash
# Trigger CI workflow manually
gh workflow run ci.yml

# View workflow runs
gh run list
```

## Monitoring & Maintenance

### Vercel

- **Analytics**: Vercel Dashboard > Analytics
- **Logs**: Vercel Dashboard > Deployments > Logs
- **Performance**: Built-in Web Vitals tracking

### Firebase

- **Console**: https://console.firebase.google.com/
- **Functions Logs**: Firebase Console > Functions > Logs
- **Performance**: Firebase Console > Performance
- **Crash Reporting**: Firebase Crashlytics (for mobile)

### Health Checks

```bash
# Check web app
curl https://miracars.gr/api/health

# Check Firebase Functions
curl https://your-region-your-project.cloudfunctions.net/health
```

## Rollback

### Vercel

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

Or use Vercel Dashboard > Deployments > Promote to Production

### Firebase

```bash
# Functions don't support rollback directly
# Redeploy previous version from git:
git checkout [previous-commit]
firebase deploy --only functions
```

## Troubleshooting

### Vercel Build Fails

1. Check build logs in Vercel Dashboard
2. Verify `ENABLE_EXPERIMENTAL_COREPACK=1` is set
3. Test build locally: `pnpm build:web`
4. Check Node.js version matches (20+)

### Firebase Deploy Fails

1. Check Firebase CLI version: `firebase --version`
2. Ensure you're logged in: `firebase login`
3. Verify project: `firebase projects:list`
4. Check functions logs: `firebase functions:log`

### Mobile Build Fails

1. Check Expo CLI version
2. Clear cache: `npx expo start -c`
3. Check EAS build logs
4. Verify certificates (iOS)

## Next Steps

- Set up monitoring and alerts
- Configure backup strategies
- Implement staging environment
- Set up A/B testing (if needed)
- Configure CDN for static assets
- Enable Redis caching (if needed)
