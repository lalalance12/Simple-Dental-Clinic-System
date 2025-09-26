import React from "react";
import { Button } from "./Button";
import { ToothIcon, PhoneIcon, LocationIcon, CalendarIcon } from "./Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-blue to-secondary-teal text-white">
      {/* Call to Action Section */}
      <div className="py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-white text-3xl font-bold mb-4">
              Experience Fresh Confidence Dental Today
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust us with their
              dental care. Schedule your appointment today and discover the
              difference quality makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                onClick={() => (window.location.href = "/book-appointment")}
                className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                📅 Book Appointment
              </Button>
              <Button
                variant="primary"
                onClick={() => (window.location.href = "tel:(555) 123-4567")}
                className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                📞 Call (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-8 border-t border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <ToothIcon size={24} className="text-white" />
              <span className="font-medium">Fresh Confidence Dental</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer hover:text-white/80 transition-colors">
                <PhoneIcon size={16} />
                <span className="text-sm">Call Us</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-white/80 transition-colors">
                <LocationIcon size={16} />
                <span className="text-sm">Visit Us</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-white/80 transition-colors">
                <CalendarIcon size={16} />
                <span className="text-sm">Book Now</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-white/60 text-sm">
              © 2024 Fresh Confidence Dental. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
