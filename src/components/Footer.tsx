import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white">M</span>
              </div>
              <span>MIRA CARS</span>
            </div>
            <p className="text-gray-400">
              Experience the finest luxury car rentals. Premium vehicles, exceptional service, 
              unforgettable journeys.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-amber-500/10 hover:text-amber-400">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-amber-500/10 hover:text-amber-400">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-amber-500/10 hover:text-amber-400">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-amber-500/10 hover:text-amber-400">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#fleet" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Our Fleet
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-amber-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-amber-400" />
                <span>123 Luxury Drive, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0 text-amber-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-amber-400" />
                <span>info@miracars.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © {currentYear} Mira Cars. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
