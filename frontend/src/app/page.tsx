"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  ServiceCard,
  Input,
  Textarea,
  Select,
  Navigation,
  ProgressStepper,
  ToothIcon,
  CleaningIcon,
  ImplantIcon,
  WhiteningIcon,
  CheckupIcon,
  CalendarIcon,
  PhoneIcon,
  LocationIcon,
} from "../components/ui";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Please enter a valid email";
    if (!formData.service) errors.service = "Please select a service";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert(
        "Appointment request submitted successfully! We will contact you soon."
      );
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }
  };

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

  const progressSteps = [
    { id: 1, label: "Contact", completed: true },
    { id: 2, label: "Service", active: true },
    { id: 3, label: "Schedule", completed: false },
    { id: 4, label: "Confirm", completed: false },
  ];

  const navItems = [
    { label: "Home", href: "#home", active: true },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const serviceOptions = [
    { value: "checkup", label: "Regular Checkup" },
    { value: "cleaning", label: "Deep Cleaning" },
    { value: "whitening", label: "Teeth Whitening" },
    { value: "implant", label: "Dental Implant" },
    { value: "emergency", label: "Emergency Care" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation
        brand={{ label: "Fresh Confidence Dental", href: "#home" }}
        items={navItems}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 pb-16 bg-gradient-to-br from-primary-blue to-secondary-teal"
      >
        <div className="container">
          <div className="grid-12">
            <div className="col-span-12 lg:col-span-6">
              <div className="fade-in-up">
                <h1 className="text-white mb-4">
                  Fresh Confidence Starts Here
                </h1>
                <p className="text-white text-lg mb-6 font-body">
                  Experience professional dental care that leaves you with a
                  bright, confident smile. Our modern approach combines
                  expertise with gentle, patient-centered service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView()
                    }
                  >
                    Book Appointment
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      document.getElementById("services")?.scrollIntoView()
                    }
                  >
                    Our Services
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 flex justify-center items-center">
              <div className="slide-in-left">
                <ToothIcon size={200} className="text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Services</h2>
            <p className="text-lg text-light max-w-2xl mx-auto">
              Comprehensive dental care tailored to your needs, delivered with
              expertise and care.
            </p>
          </div>

          <div className="grid-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="col-span-12 sm:col-span-6 lg:col-span-3"
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  onClick={() => alert(`Learn more about ${service.title}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="contact" className="py-16">
        <div className="container">
          <div className="grid-12">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="mb-6">Book Your Appointment</h2>
              <p className="text-lg text-light mb-8">
                Take the first step towards a healthier, more confident smile.
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              {/* Progress Indicator */}
              <div className="mb-8">
                <ProgressStepper steps={progressSteps} />
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <PhoneIcon size={20} className="text-secondary" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <LocationIcon size={20} className="text-secondary" />
                  <span>123 Dental Street, Smile City, SC 12345</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon size={20} className="text-secondary" />
                  <span>Mon-Fri: 8AM-6PM, Sat: 9AM-3PM</span>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(value) => handleInputChange("name", value)}
                    error={formErrors.name}
                    required
                  />

                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    error={formErrors.email}
                    required
                  />

                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(value) => handleInputChange("phone", value)}
                  />

                  <Select
                    label="Service Needed"
                    placeholder="Select a service"
                    options={serviceOptions}
                    value={formData.service}
                    onChange={(value) => handleInputChange("service", value)}
                    error={formErrors.service}
                    required
                  />

                  <Textarea
                    label="Additional Message"
                    placeholder="Tell us about your dental concerns or questions..."
                    value={formData.message}
                    onChange={(value) => handleInputChange("message", value)}
                    rows={4}
                  />

                  <Button type="submit" className="w-full">
                    Request Appointment
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-blue text-white py-8">
        <div className="container">
          <div className="text-center">
            <h3 className="font-heading text-xl mb-2">
              Fresh Confidence Dental
            </h3>
            <p className="text-light mb-4">
              Bringing confidence to every smile since 2024
            </p>
            <div className="flex justify-center gap-6">
              <PhoneIcon size={20} />
              <LocationIcon size={20} />
              <CalendarIcon size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
