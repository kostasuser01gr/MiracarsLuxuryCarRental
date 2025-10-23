import { Button } from "./ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYwMzcwNTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30">
            <span className="text-amber-400">Premium Luxury Rentals</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl text-white max-w-4xl mx-auto leading-tight">
            Experience Luxury on Every Journey
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our exclusive collection of premium vehicles. From exotic supercars to elegant sedans, 
            find your perfect ride.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={onBookingClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Experience
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6"
            >
              Explore Fleet
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-500/20 rounded-full">
                <MapPin className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-white">Multiple Locations</h3>
              <p className="text-gray-400">Pick up anywhere, anytime</p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-500/20 rounded-full">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-white">24/7 Service</h3>
              <p className="text-gray-400">Round-the-clock support</p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-500/20 rounded-full">
                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white">Premium Fleet</h3>
              <p className="text-gray-400">100+ luxury vehicles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-label="Scroll down">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
