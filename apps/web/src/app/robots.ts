import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miracars.gr';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/account/',
          '/api/',
          '/_next/',
          '/booking/confirm',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
