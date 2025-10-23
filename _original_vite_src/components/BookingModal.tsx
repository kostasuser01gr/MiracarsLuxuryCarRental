import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Car } from "./CarCard";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  car?: Car;
}

// Helper function to format dates
const formatDate = (date: Date, format: string): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  if (format === "PPP") {
    return `${month} ${day}, ${year}`;
  }
  if (format === "MMM dd") {
    return `${month} ${day}`;
  }
  if (format === "MMM dd, yyyy") {
    return `${month} ${day}, ${year}`;
  }
  return date.toLocaleDateString();
};

export function BookingModal({ isOpen, onClose, car }: BookingModalProps) {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [step, setStep] = useState(1);

  // Form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
  });

  const locations = [
    "Los Angeles International Airport",
    "Beverly Hills Center",
    "Santa Monica Beach",
    "Downtown LA",
    "Malibu Coast",
    "Newport Beach",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!pickupDate || !returnDate || !pickupLocation || !returnLocation) {
        toast.error("Please fill in all booking details");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error("Please fill in all personal details");
        return;
      }
      setStep(3);
    } else {
      // Final submission
      toast.success("Booking confirmed! Check your email for details.", {
        description: `Your ${car?.brand} ${car?.name} is reserved from ${formatDate(pickupDate!, "MMM dd")} to ${formatDate(returnDate!, "MMM dd")}`,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setStep(1);
    setPickupDate(undefined);
    setReturnDate(undefined);
    setPickupLocation("");
    setReturnLocation("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      licenseNumber: "",
    });
    onClose();
  };

  const calculateDays = () => {
    if (pickupDate && returnDate) {
      const diff = returnDate.getTime() - pickupDate.getTime();
      return Math.ceil(diff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const totalPrice = car ? calculateDays() * car.price : 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Booking Details"}
            {step === 2 && "Personal Information"}
            {step === 3 && "Payment & Confirmation"}
          </DialogTitle>
        </DialogHeader>

        {car && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden">
                <ImageWithFallback src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-gray-900">{car.brand} {car.name}</p>
                <p className="text-amber-600">${car.price}/day</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? formatDate(pickupDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? formatDate(returnDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        disabled={(date) => {
                          const minDate = pickupDate || new Date();
                          const compareDate = new Date(minDate);
                          compareDate.setHours(0, 0, 0, 0);
                          return date < compareDate;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Locations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pickup Location</Label>
                  <Select value={pickupLocation} onValueChange={setPickupLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Return Location</Label>
                  <Select value={returnLocation} onValueChange={setReturnLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {calculateDays() > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-gray-700">Rental Duration: {calculateDays()} days</p>
                  <p className="text-gray-900">Estimated Total: ${totalPrice}</p>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label>Driver's License Number</Label>
                <Input
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder="DL123456789"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" type="password" maxLength={3} />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h4 className="text-gray-900">Booking Summary</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>Vehicle: {car?.brand} {car?.name}</p>
                    <p>Pickup: {pickupDate && formatDate(pickupDate, "MMM dd, yyyy")}</p>
                    <p>Return: {returnDate && formatDate(returnDate, "MMM dd, yyyy")}</p>
                    <p>Duration: {calculateDays()} days</p>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-gray-900">Total: ${totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              {step === 3 ? "Confirm Booking" : "Continue"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
