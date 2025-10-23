import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">{t('common.app_name')}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">{t('home.title')}</h2>
          <p className="text-xl text-gray-600 mb-12">{t('home.subtitle')}</p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">
                {t('home.features.premium_fleet.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.premium_fleet.description')}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">
                {t('home.features.support.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.support.description')}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">
                {t('home.features.best_rates.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.best_rates.description')}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/fleet"
              className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              {t('common.view_fleet')}
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
