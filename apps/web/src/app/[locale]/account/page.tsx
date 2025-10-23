import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function AccountPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{t('account')}</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Profile</h2>
              <p className="text-gray-600">
                TODO: User profile management
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
              <p className="text-gray-600">
                TODO: List user bookings with status tracking
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Saved Drivers</h2>
              <p className="text-gray-600">
                TODO: Manage saved driver information
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Documents</h2>
              <p className="text-gray-600">
                TODO: Upload and manage driver license and documents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
