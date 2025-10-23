import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Car } from "./CarCard";
import { Users, Gauge, Cog, Fuel, Calendar, Shield, Star, MapPin } from "lucide-react";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CarDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
  onBookClick: (car: Car) => void;
}

export function CarDetailModal({
  isOpen,
  onClose,
  car,
  onBookClick,
}: CarDetailModalProps) {
  if (!car) return null;

  const features = [
    "Leather Interior",
    "Premium Sound System",
    "Navigation System",
    "Bluetooth Connectivity",
    "Parking Sensors",
    "Backup Camera",
    "Climate Control",
    "Cruise Control",
    "Keyless Entry",
    "Push Button Start",
  ];

  const specifications = [
    { icon: Users, label: "Passengers", value: `${car.seats} Seats` },
    { icon: Cog, label: "Transmission", value: car.transmission },
    { icon: Gauge, label: "Top Speed", value: car.topSpeed },
    { icon: Fuel, label: "Fuel Type", value: "Premium" },
    { icon: Calendar, label: "Year", value: "2024" },
    { icon: Shield, label: "Insurance", value: "Included" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              {car.brand} {car.name}
            </span>
            {car.available ? (
              <Badge className="bg-green-500 text-white border-none">Available</Badge>
            ) : (
              <Badge variant="destructive">Unavailable</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative h-96 rounded-xl overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={car.image}
              alt={`${car.brand} ${car.name}`}
              className="w-full h-full object-cover"
            />
            {car.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-none">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Category and Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600">{car.category}</p>
              <h3 className="text-gray-900">
                {car.brand} {car.name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Starting from</p>
              <p className="text-gray-900">${car.price}/day</p>
            </div>
          </div>

          <Separator />

          {/* Specifications */}
          <div>
            <h4 className="text-gray-900 mb-4">Specifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specifications.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-gray-500">{spec.label}</p>
                      <p className="text-gray-900">{spec.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div>
            <h4 className="text-gray-900 mb-4">Features & Amenities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Pickup Locations */}
          <div>
            <h4 className="text-gray-900 mb-4">Available Pickup Locations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Los Angeles International Airport",
                "Beverly Hills Center",
                "Santa Monica Beach",
                "Downtown LA",
              ].map((location, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{location}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Terms */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="text-gray-900 mb-2">Rental Terms</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Minimum rental period: 24 hours</li>
              <li>• Driver must be 25 years or older</li>
              <li>• Valid driver's license required</li>
              <li>• Security deposit: ${car.price * 2}</li>
              <li>• Insurance included in price</li>
              <li>• 24/7 roadside assistance included</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              onClick={() => {
                onBookClick(car);
                onClose();
              }}
              disabled={!car.available}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              Book This Vehicle
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
