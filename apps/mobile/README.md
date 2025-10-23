# Mira Cars Mobile App

React Native mobile application built with Expo and Expo Router.

## Features

- **Expo Router**: File-based routing for React Native
- **Tab Navigation**: Home, Fleet, Bookings, Profile
- **Firebase Integration**: Ready for authentication and data
- **React Query**: Data fetching and caching
- **TypeScript**: Full type safety
- **Monorepo Integration**: Uses shared packages from workspace

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- iOS Simulator (for iOS development)
- Android Studio + Emulator (for Android development)

### Installation

```bash
# From repository root
pnpm install

# Start the development server
pnpm --filter=mobile dev
```

### Running on Devices

```bash
# iOS
pnpm --filter=mobile ios

# Android
pnpm --filter=mobile android

# Web (for testing)
pnpm --filter=mobile web
```

## Project Structure

```
apps/mobile/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── fleet.tsx      # Fleet listing
│   │   ├── bookings.tsx   # My bookings
│   │   └── profile.tsx    # User profile
│   ├── vehicle/           # Vehicle details (dynamic route)
│   ├── booking.tsx        # Booking flow
│   └── _layout.tsx        # Root layout with providers
├── src/
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities
├── assets/                # Images, fonts, etc.
└── app.json               # Expo configuration
```

## Environment Variables

Create a `.env.local` file in the mobile app directory:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Building for Production

### Using EAS (Expo Application Services)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure the project
eas build:configure

# Build for Android
pnpm --filter=mobile build:android

# Build for iOS
pnpm --filter=mobile build:ios
```

### Local Development Build

```bash
# Create a development build
npx expo prebuild

# Run with custom native code
npx expo run:ios
npx expo run:android
```

## Screens Implemented

### Home Screen
- Welcome message
- Feature highlights
- Navigation to fleet

### Fleet Screen
- Vehicle listing with images
- Category and pricing display
- Navigation to vehicle details
- Uses `Vehicle` type from `@mira-cars/core`

### Bookings Screen (TODO)
- User's booking history
- Booking status tracking
- Cancel/modify bookings

### Profile Screen (TODO)
- User authentication
- Profile management
- Settings and preferences

## TODO

- [ ] Implement vehicle detail screen
- [ ] Add booking flow
- [ ] Integrate Firebase authentication
- [ ] Add React Query hooks for data fetching
- [ ] Implement i18n with i18n-js
- [ ] Add form validation with react-hook-form + zod
- [ ] Implement secure token storage
- [ ] Add push notifications
- [ ] Implement offline support
- [ ] Add unit tests

## Testing

```bash
# Run tests (when implemented)
pnpm --filter=mobile test
```

## Troubleshooting

### Metro bundler issues

```bash
# Clear cache
npx expo start -c
```

### iOS build issues

```bash
# Clean iOS build
cd ios && xcodebuild clean
```

### Android build issues

```bash
# Clean Android build
cd android && ./gradlew clean
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- [React Native](https://reactnative.dev/)
- [React Query](https://tanstack.com/query/)
