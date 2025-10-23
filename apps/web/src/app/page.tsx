import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Mira Cars</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Luxury Car Rental in Greece
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Experience the finest collection of luxury and exotic vehicles
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">Premium Fleet</h3>
              <p className="text-gray-600">Exotic and luxury vehicles from top brands</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to assist you</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">Best Rates</h3>
              <p className="text-gray-600">Competitive pricing with seasonal offers</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Monorepo Architecture</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-blue-50 rounded border border-blue-200">
                <h4 className="font-semibold mb-2">✅ Packages Implemented</h4>
                <ul className="text-sm space-y-1">
                  <li>• @mira-cars/core - Business logic & models</li>
                  <li>• @mira-cars/ui - Shared UI components</li>
                  <li>• @mira-cars/sdk - Firebase & API client</li>
                  <li>• @mira-cars/config - Shared configs</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded border border-green-200">
                <h4 className="font-semibold mb-2">✅ Features Ready</h4>
                <ul className="text-sm space-y-1">
                  <li>• Turborepo monorepo with pnpm</li>
                  <li>• Next.js 14 App Router</li>
                  <li>• TypeScript strict mode</li>
                  <li>• Unit tests with Vitest</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/fleet"
              className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              View Fleet
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Mira Cars. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
