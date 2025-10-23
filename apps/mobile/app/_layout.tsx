import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { initializeFirebase } from '@mira-cars/sdk';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    // Initialize Firebase
    // Note: You'll need to add Firebase config to your environment
    // initializeFirebase({
    //   apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
    //   authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    //   projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
    //   storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    //   messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    //   appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
    // });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="vehicle/[id]" options={{ title: 'Vehicle Details' }} />
        <Stack.Screen name="booking" options={{ title: 'Book Vehicle' }} />
      </Stack>
    </QueryClientProvider>
  );
}
