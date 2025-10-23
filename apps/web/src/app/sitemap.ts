import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miracars.gr';
  const locales = ['el', 'en'];
  
  // Generate sitemap entries for each locale
  const routes = [
    '',
    '/fleet',
    '/about',
    '/contact',
    '/legal/terms',
    '/legal/privacy',
    '/legal/rental-policy',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = locale === 'el' 
        ? `${baseUrl}${route}` 
        : `${baseUrl}/${locale}${route}`;
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            el: `${baseUrl}${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  // TODO: Add dynamic vehicle pages from database
  // Example:
  // const vehicles = await fetchVehicles();
  // vehicles.forEach((vehicle) => {
  //   locales.forEach((locale) => {
  //     sitemapEntries.push({
  //       url: `${baseUrl}/${locale}/fleet/${vehicle.slug}`,
  //       lastModified: vehicle.updatedAt,
  //       changeFrequency: 'weekly',
  //       priority: 0.7,
  //     });
  //   });
  // });

  return sitemapEntries;
}
