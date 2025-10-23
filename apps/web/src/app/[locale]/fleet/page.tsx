import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Vehicle } from '@mira-cars/core';

// Mock data - in production this would come from Firebase
const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Aventador SVJ',
    brand: 'Lamborghini',
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: 1500,
    seats: 2,
    transmission: 'Automatic',
    topSpeed: '217 mph',
    available: true,
    featured: true,
  },
  {
    id: '2',
    name: 'S-Class',
    brand: 'Mercedes-Benz',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    price: 450,
    seats: 5,
    transmission: 'Automatic',
    topSpeed: '155 mph',
    available: true,
    featured: true,
  },
  {
    id: '3',
    name: '911 Carrera',
    brand: 'Porsche',
    category: 'Sports Car',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    price: 900,
    seats: 4,
    transmission: 'Manual',
    topSpeed: '191 mph',
    available: true,
    featured: false,
  },
];

export default function FleetPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold hover:text-gray-600">
            {t('common.app_name')}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{t('fleet.title')}</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-video bg-gray-200 relative">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {vehicle.brand} {vehicle.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {vehicle.category}
                    </span>
                  </div>
                  {vehicle.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      {t('common.featured')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>
                    {vehicle.seats} {t('common.seats')}
                  </span>
                  <span>•</span>
                  <span>{vehicle.transmission}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">
                      {t('common.currency')}
                      {vehicle.price}
                    </span>
                    <span className="text-gray-500">{t('common.per_day')}</span>
                  </div>
                  <button
                    className={`px-4 py-2 rounded ${
                      vehicle.available
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!vehicle.available}
                  >
                    {vehicle.available
                      ? t('common.book_now')
                      : t('common.unavailable')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
