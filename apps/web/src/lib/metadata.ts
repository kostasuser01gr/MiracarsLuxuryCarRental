import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    default: 'Mira Cars - Luxury Car Rental in Greece',
    template: '%s | Mira Cars',
  },
  description:
    'Experience the finest collection of luxury and exotic vehicles. Premium car rental service in Greece with 24/7 support and competitive rates.',
  keywords: [
    'luxury car rental',
    'exotic cars',
    'Greece car rental',
    'premium vehicles',
    'luxury vehicles Greece',
    'sports car rental',
    'supercar rental',
  ],
  authors: [{ name: 'Mira Cars' }],
  creator: 'Mira Cars',
  publisher: 'Mira Cars',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://miracars.gr'
  ),
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    alternateLocale: ['en_US'],
    url: 'https://miracars.gr',
    title: 'Mira Cars - Luxury Car Rental in Greece',
    description:
      'Experience the finest collection of luxury and exotic vehicles. Premium car rental service in Greece.',
    siteName: 'Mira Cars',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mira Cars - Luxury Car Rental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mira Cars - Luxury Car Rental in Greece',
    description:
      'Experience the finest collection of luxury and exotic vehicles.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    // Add verification tokens when available
    // google: 'your-google-verification-token',
    // yandex: 'your-yandex-verification-token',
  },
};

export function generateVehicleMetadata(vehicle: {
  name: string;
  brand: string;
  description?: string;
  image?: string;
}): Metadata {
  const title = `${vehicle.brand} ${vehicle.name}`;
  const description =
    vehicle.description ||
    `Rent the ${vehicle.brand} ${vehicle.name} - Premium luxury vehicle available for rental in Greece.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: vehicle.image ? [{ url: vehicle.image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: vehicle.image ? [vehicle.image] : [],
    },
  };
}
