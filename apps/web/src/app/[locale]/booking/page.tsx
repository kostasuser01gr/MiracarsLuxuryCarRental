import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function BookingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('booking');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Booking Flow</h2>
              <p className="text-gray-600 mb-4">
                Multi-step booking wizard will be implemented here
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <div className="px-4 py-2 bg-blue-50 rounded">
                  {t('steps.dates')}
                </div>
                <div className="px-4 py-2 bg-blue-50 rounded">
                  {t('steps.extras')}
                </div>
                <div className="px-4 py-2 bg-blue-50 rounded">
                  {t('steps.details')}
                </div>
                <div className="px-4 py-2 bg-blue-50 rounded">
                  {t('steps.review')}
                </div>
                <div className="px-4 py-2 bg-blue-50 rounded">
                  {t('steps.payment')}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-8">
                TODO: Implement with react-hook-form + zod validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
