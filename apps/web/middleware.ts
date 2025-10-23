import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['el', 'en'],

  // Used when no locale matches
  defaultLocale: 'el',

  // Always show the locale prefix
  localePrefix: 'as-needed',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(el|en)/:path*'],
};
