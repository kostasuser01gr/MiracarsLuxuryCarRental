import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Users, Gauge, Cog, Calendar } from "lucide-react";

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  seats: number;
  transmission: string;
  topSpeed: string;
  available: boolean;
  featured?: boolean;
}

interface CarCardProps {
  car: Car;
  onBookClick: (car: Car) => void;
  onDetailsClick: (car: Car) => void;
}

export function CarCard({ car, onBookClick, onDetailsClick }: CarCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {car.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-none">
              Featured
            </Badge>
          </div>
        )}
        {!car.available && (
          <div className="absolute top-4 right-4">
            <Badge variant="destructive">Unavailable</Badge>
          </div>
        )}
        {car.available && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-500 text-white border-none">Available</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title & Category */}
        <div>
          <p className="text-amber-600">{car.category}</p>
          <h3 className="text-gray-900">
            {car.brand} {car.name}
          </h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Cog className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Gauge className="w-4 h-4" />
            <span>{car.topSpeed}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Latest Model</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500">Starting from</p>
              <p className="text-gray-900">${car.price}/day</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onDetailsClick(car)}
              className="flex-1"
            >
              Details
            </Button>
            <Button
              onClick={() => onBookClick(car)}
              disabled={!car.available}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
