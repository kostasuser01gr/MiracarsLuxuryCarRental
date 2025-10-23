import { Search, Calendar, Key, Shield } from "lucide-react";

export function Features() {
  const steps = [
    {
      icon: Search,
      title: "Browse & Select",
      description: "Explore our premium fleet and choose your perfect vehicle from our curated collection.",
    },
    {
      icon: Calendar,
      title: "Book Online",
      description: "Select your dates and location. Our seamless booking process takes just minutes.",
    },
    {
      icon: Shield,
      title: "Verify & Confirm",
      description: "Complete verification with secure payment. Receive instant confirmation and details.",
    },
    {
      icon: Key,
      title: "Pick Up & Drive",
      description: "Collect your vehicle at your chosen location and enjoy the luxury experience.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-amber-500/10 rounded-full mb-4">
            <span className="text-amber-600">Simple Process</span>
          </div>
          <h2 className="text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Renting luxury has never been easier. Follow these simple steps to get behind the wheel 
            of your dream car.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-amber-200 to-transparent z-0" />
                )}
                
                <div className="relative z-10 text-center space-y-4">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg">
                    <Icon className="w-10 h-10" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center">
                    <span className="text-amber-600">{index + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-gray-900">Fully Insured</h4>
            <p className="text-gray-600">Comprehensive coverage included with every rental</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-gray-900">24/7 Support</h4>
            <p className="text-gray-600">Round-the-clock assistance whenever you need it</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-gray-900">No Hidden Fees</h4>
            <p className="text-gray-600">Transparent pricing with no surprise charges</p>
          </div>
        </div>
      </div>
    </section>
  );
}
