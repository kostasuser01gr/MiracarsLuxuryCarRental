import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function AdminPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{t('admin')} Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* KPI Cards */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Bookings
            </h3>
            <p className="text-3xl font-bold">--</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Revenue (EUR)
            </h3>
            <p className="text-3xl font-bold">--</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Fleet Utilization
            </h3>
            <p className="text-3xl font-bold">--%</p>
          </div>

          {/* Admin Sections */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Admin Sections</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold mb-1">Vehicles</h3>
                <p className="text-sm text-gray-600">Manage fleet CRUD</p>
              </div>
              <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold mb-1">Bookings</h3>
                <p className="text-sm text-gray-600">View & manage bookings</p>
              </div>
              <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold mb-1">Pricing Rules</h3>
                <p className="text-sm text-gray-600">Seasonal pricing</p>
              </div>
              <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold mb-1">Customers</h3>
                <p className="text-sm text-gray-600">Customer management</p>
              </div>
              <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold mb-1">Promo Codes</h3>
                <p className="text-sm text-gray-600">Manage promotions</p>
              </div>
              <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold mb-1">Media</h3>
                <p className="text-sm text-gray-600">Media library</p>
              </div>
              <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold mb-1">Analytics</h3>
                <p className="text-sm text-gray-600">Reports & insights</p>
              </div>
              <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold mb-1">Settings</h3>
                <p className="text-sm text-gray-600">System configuration</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              TODO: Implement admin panel with role-based access control
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
