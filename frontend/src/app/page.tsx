"use client";

import React from "react";
import {
  Button,
  ServiceCard,
  Header,
  Footer,
  ToothIcon,
  CleaningIcon,
  ImplantIcon,
  WhiteningIcon,
  CheckupIcon,
  CalendarIcon,
} from "../components/ui";

export default function Home() {
  const services = [
    {
      icon: <CheckupIcon />,
      title: "Regular Checkup",
      description: "Comprehensive dental examination and cleaning",
    },
    {
      icon: <CleaningIcon />,
      title: "Deep Cleaning",
      description: "Professional cleaning for healthy gums",
    },
    {
      icon: <WhiteningIcon />,
      title: "Teeth Whitening",
      description: "Brighten your smile with professional whitening",
    },
    {
      icon: <ImplantIcon />,
      title: "Dental Implants",
      description: "Restore your smile with permanent solutions",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header currentPage="home" />

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-r from-primary-blue to-secondary-teal"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-white rounded-full"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <ToothIcon size={16} className="text-white" />
              <span className="text-white text-sm font-medium">
                Fresh Confidence Dental Clinic
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Your Smile Deserves the{" "}
              <span className="text-secondary">Best Care</span>
            </h1>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Experience exceptional dental care with our team of experienced
              professionals. We combine cutting-edge technology with
              compassionate service to give you the healthy, confident smile you
              deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                onClick={() => (window.location.href = "/book-appointment")}
                className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <CalendarIcon size={18} className="mr-2" />
                Book Appointment
              </Button>
              <Button
                variant="primary"
                onClick={() => (window.location.href = "/services")}
                className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <ToothIcon size={18} className="mr-2" />
                Our Services
              </Button>
            </div>

            {/* Admin Access */}
            <div className="mt-8">
              <button
                onClick={() => (window.location.href = "/admin")}
                className="text-white/70 hover:text-white text-sm underline underline-offset-4 transition-colors"
              >
                Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-teal-50 rounded-full px-6 py-3 mb-6 shadow-lg border border-blue-100">
              <ToothIcon size={16} className="text-primary" />
              <span className="text-primary text-sm font-medium">
                Our Services
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-dark">
              Comprehensive <span className="text-primary">Dental Care</span>
            </h2>
            <p className="text-lg text-dark/80 max-w-3xl mx-auto leading-relaxed">
              From routine checkups to advanced restorative procedures, we offer
              a full range of dental services to meet all your oral health
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                onClick={() => (window.location.href = "/services")}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/services")}
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
