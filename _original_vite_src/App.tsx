import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CarGrid } from "./components/CarGrid";
import { Features } from "./components/Features";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { AuthModal } from "./components/AuthModal";
import { CarDetailModal } from "./components/CarDetailModal";
import { Car } from "./components/CarCard";
import { Toaster } from "./components/ui/sonner";

// Mock car data
const cars: Car[] = [
  {
    id: "1",
    name: "Aventador SVJ",
    brand: "Lamborghini",
    category: "Exotic",
    image: "https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYwMzcwNTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 1500,
    seats: 2,
    transmission: "Automatic",
    topSpeed: "217 mph",
    available: true,
    featured: true,
  },
  {
    id: "2",
    name: "S-Class",
    brand: "Mercedes-Benz",
    category: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1731142582229-e0ee70302c02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjAzMzMwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 450,
    seats: 5,
    transmission: "Automatic",
    topSpeed: "155 mph",
    available: true,
    featured: true,
  },
  {
    id: "3",
    name: "Range Rover",
    brand: "Land Rover",
    category: "Luxury SUV",
    image: "https://images.unsplash.com/photo-1570829194611-71a926d70ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdXYlMjBjYXJ8ZW58MXx8fHwxNzYwMzY4NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 550,
    seats: 7,
    transmission: "Automatic",
    topSpeed: "140 mph",
    available: true,
    featured: false,
  },
  {
    id: "4",
    name: "911 Carrera",
    brand: "Porsche",
    category: "Sports Car",
    image: "https://images.unsplash.com/photo-1758191244605-68cba1095e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY29udmVydGlibGUlMjBjYXJ8ZW58MXx8fHwxNzYwNDUyMjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 900,
    seats: 4,
    transmission: "Manual",
    topSpeed: "191 mph",
    available: true,
    featured: false,
  },
  {
    id: "5",
    name: "F8 Tributo",
    brand: "Ferrari",
    category: "Exotic",
    image: "https://images.unsplash.com/photo-1593219535889-7873a100874a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleG90aWMlMjBzdXBlcmNhcnxlbnwxfHx8fDE3NjA0NTIyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 2000,
    seats: 2,
    transmission: "Automatic",
    topSpeed: "211 mph",
    available: false,
    featured: true,
  },
  {
    id: "6",
    name: "Continental GT",
    brand: "Bentley",
    category: "Grand Tourer",
    image: "https://images.unsplash.com/photo-1599912027667-755b68b4dd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAzODA3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 1200,
    seats: 4,
    transmission: "Automatic",
    topSpeed: "207 mph",
    available: true,
    featured: false,
  },
  {
    id: "7",
    name: "DB11",
    brand: "Aston Martin",
    category: "Grand Tourer",
    image: "https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYwMzcwNTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 1100,
    seats: 4,
    transmission: "Automatic",
    topSpeed: "200 mph",
    available: true,
    featured: false,
  },
  {
    id: "8",
    name: "Escalade",
    brand: "Cadillac",
    category: "Luxury SUV",
    image: "https://images.unsplash.com/photo-1570829194611-71a926d70ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdXYlMjBjYXJ8ZW58MXx8fHwxNzYwMzY4NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 400,
    seats: 7,
    transmission: "Automatic",
    topSpeed: "130 mph",
    available: true,
    featured: false,
  },
  {
    id: "9",
    name: "M8 Competition",
    brand: "BMW",
    category: "Sports Car",
    image: "https://images.unsplash.com/photo-1758191244605-68cba1095e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY29udmVydGlibGUlMjBjYXJ8ZW58MXx8fHwxNzYwNDUyMjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 800,
    seats: 4,
    transmission: "Automatic",
    topSpeed: "190 mph",
    available: true,
    featured: false,
  },
];

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | undefined>();

  const handleBookClick = (car?: Car) => {
    setSelectedCar(car);
    setIsBookingModalOpen(true);
  };

  const handleDetailsClick = (car: Car) => {
    setSelectedCar(car);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onAuthClick={() => setIsAuthModalOpen(true)}
        onBookingClick={() => handleBookClick()}
      />
      <Hero onBookingClick={() => handleBookClick()} />
      <CarGrid
        cars={cars}
        onBookClick={handleBookClick}
        onDetailsClick={handleDetailsClick}
      />
      <Features />
      <Testimonials />
      <Footer />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedCar(undefined);
        }}
        car={selectedCar}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <CarDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCar(undefined);
        }}
        car={selectedCar || null}
        onBookClick={handleBookClick}
      />

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
