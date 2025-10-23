import { useState } from "react";
import { CarCard, Car } from "./CarCard";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CarGridProps {
  cars: Car[];
  onBookClick: (car: Car) => void;
  onDetailsClick: (car: Car) => void;
}

export function CarGrid({ cars, onBookClick, onDetailsClick }: CarGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(cars.map((car) => car.category)))];

  // Filter and sort cars
  const filteredCars = cars
    .filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || car.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });

  return (
    <section id="fleet" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-amber-500/10 rounded-full mb-4">
            <span className="text-amber-600">Our Fleet</span>
          </div>
          <h2 className="text-gray-900 mb-4">
            Explore Our Premium Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our curated selection of the world's finest automobiles. Each vehicle is 
            meticulously maintained and ready for your next adventure.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by brand or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-white">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto bg-white">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category === "all" ? "All Vehicles" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onBookClick={onBookClick}
              onDetailsClick={onDetailsClick}
            />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No vehicles found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
