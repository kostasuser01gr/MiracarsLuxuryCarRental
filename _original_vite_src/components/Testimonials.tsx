import { Star } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Testimonials() {
  const testimonials = [
    {
      name: "Michael Stevens",
      role: "Business Executive",
      rating: 5,
      content: "Exceptional service from start to finish. The Lamborghini I rented was in pristine condition. The team at Mira Cars made the entire process seamless.",
      initials: "MS",
    },
    {
      name: "Sarah Johnson",
      role: "Event Planner",
      rating: 5,
      content: "I've rented luxury cars for numerous high-profile events. Mira Cars consistently delivers the best vehicles and most professional service in the industry.",
      initials: "SJ",
    },
    {
      name: "David Chen",
      role: "Entrepreneur",
      rating: 5,
      content: "The attention to detail is remarkable. From the booking process to the vehicle handover, everything exceeded my expectations. Truly a premium experience.",
      initials: "DC",
    },
    {
      name: "Emma Williams",
      role: "Fashion Designer",
      rating: 5,
      content: "Perfect for special occasions! I rented a Bentley for a gala event and received countless compliments. The car was stunning and the service impeccable.",
      initials: "EW",
    },
    {
      name: "James Rodriguez",
      role: "Film Producer",
      rating: 5,
      content: "We've used Mira Cars for multiple film productions. Their fleet is exceptional and they always accommodate our tight schedules. Highly recommended!",
      initials: "JR",
    },
    {
      name: "Lisa Anderson",
      role: "Travel Blogger",
      rating: 5,
      content: "As someone who values luxury experiences, Mira Cars never disappoints. The vehicles are immaculate and the customer service is world-class.",
      initials: "LA",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-amber-500/10 rounded-full mb-4">
            <span className="text-amber-600">Testimonials</span>
          </div>
          <h2 className="text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued clients have to say about 
            their experiences with Mira Cars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-gray-900">5,000+</p>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-gray-900">100+</p>
            <p className="text-gray-600">Premium Vehicles</p>
          </div>
          <div className="text-center">
            <p className="text-gray-900">15+</p>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-gray-900">4.9/5</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
