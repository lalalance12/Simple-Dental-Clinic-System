"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Header,
  Footer,
  ToothIcon,
  CleaningIcon,
  ImplantIcon,
  WhiteningIcon,
  CheckupIcon,
  CalendarIcon,
  PhoneIcon,
  LocationIcon,
} from "../../components/ui";

const services = [
  {
    id: "checkup",
    icon: <CheckupIcon size={64} className="text-white" />,
    title: "Regular Checkup",
    shortDesc: "Comprehensive dental examination and cleaning",
    longDesc:
      "Our comprehensive dental checkups include a thorough examination of your teeth, gums, and mouth. We use advanced digital imaging technology to detect any potential issues early, ensuring optimal oral health. Professional cleaning removes plaque and tartar buildup, preventing cavities and gum disease.",
    duration: "45-60 minutes",
    price: "From ₱4,800",
    features: [
      "Complete oral examination",
      "Digital X-rays",
      "Professional cleaning",
      "Oral cancer screening",
      "Treatment planning",
      "Preventive care consultation",
    ],
    benefits: [
      "Early detection of dental issues",
      "Prevention of serious problems",
      "Maintained oral health",
      "Fresh, clean feeling",
      "Personalized care plan",
    ],
  },
  {
    id: "cleaning",
    icon: <CleaningIcon size={64} className="text-white" />,
    title: "Deep Cleaning",
    shortDesc: "Professional cleaning for healthy gums",
    longDesc:
      "Deep cleaning, also known as scaling and root planing, is a thorough cleaning procedure that removes plaque and tartar from below the gum line. This treatment is essential for treating gum disease and preventing its progression. Our experienced hygienists use gentle techniques and advanced equipment for your comfort.",
    duration: "60-90 minutes",
    price: "From ₱7,600",
    features: [
      "Ultrasonic scaling",
      "Hand scaling and root planing",
      "Antibiotic treatment if needed",
      "Local anesthesia",
      "Post-care instructions",
      "Follow-up appointments",
    ],
    benefits: [
      "Treatment of gum disease",
      "Prevention of tooth loss",
      "Fresher breath",
      "Healthier gums",
      "Reduced inflammation",
      "Improved overall health",
    ],
  },
  {
    id: "whitening",
    icon: <WhiteningIcon size={64} className="text-white" />,
    title: "Teeth Whitening",
    shortDesc: "Brighten your smile with professional whitening",
    longDesc:
      "Achieve a brighter, more confident smile with our professional teeth whitening services. We offer both in-office and take-home whitening options using safe, effective whitening agents. Our whitening treatments are customized to your needs and deliver dramatic results in just one visit.",
    duration: "30-60 minutes",
    price: "From ₱12,700",
    features: [
      "Custom shade matching",
      "Professional whitening gel",
      "LED light acceleration",
      "Desensitizing treatment",
      "Take-home kits available",
      "Maintenance instructions",
    ],
    benefits: [
      "Brighter, whiter smile",
      "Increased confidence",
      "Youthful appearance",
      "Professional results",
      "Long-lasting effects",
      "Safe and effective",
    ],
  },
  {
    id: "implant",
    icon: <ImplantIcon size={64} className="text-white" />,
    title: "Dental Implants",
    shortDesc: "Restore your smile with permanent solutions",
    longDesc:
      "Dental implants are the gold standard for replacing missing teeth. Our implant procedures use high-quality titanium implants that integrate with your jawbone, providing a stable foundation for replacement teeth. We offer single tooth, multiple teeth, and full mouth implant solutions.",
    duration: "2-6 months (including healing)",
    price: "From ₱127,000",
    features: [
      "3D imaging and planning",
      "Surgical placement",
      "Premium implant systems",
      "Custom abutments",
      "Porcelain crowns",
      "Warranty coverage",
    ],
    benefits: [
      "Permanent tooth replacement",
      "Natural look and feel",
      "Preserved bone structure",
      "Improved chewing ability",
      "Enhanced self-confidence",
      "Long-term durability",
    ],
  },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", active: true },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function ServicesPage() {
  const router = useRouter();

  const handleBookAppointment = () => {
    router.push("/book-appointment");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header currentPage="services" />

      {/* Hero Section with CTA */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-blue to-secondary-teal relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-white text-sm font-medium">
                ✨ Our Services
              </span>
            </div>
            <h1 className="text-white mb-6 leading-tight text-4xl font-bold">
              Comprehensive Dental Care Services
            </h1>
            <p className="text-white/90 text-lg mb-8 font-body leading-relaxed max-w-2xl mx-auto">
              Discover our full range of dental services designed to meet all
              your oral health needs. From routine checkups to advanced
              treatments, we provide exceptional care with cutting-edge
              technology and compassionate expertise.
            </p>
            <Button
              variant="secondary"
              onClick={handleBookAppointment}
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg px-8 py-4"
            >
              📅 Book an Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid-12 gap-12 items-center ${
                  index % 2 === 1 ? "flex-row-reverse" : ""
                }`}
              >
                {/* Service Icon & Basic Info */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="text-center lg:text-left">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-lg">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-dark mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-dark/80 mb-6">
                      {service.shortDesc}
                    </p>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-dark font-medium">Duration:</span>
                        <span className="text-secondary font-semibold">
                          {service.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-dark font-medium">
                          Starting Price:
                        </span>
                        <span className="text-primary font-bold text-lg">
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-dark mb-6">
                      About This Service
                    </h3>
                    <p className="text-dark/80 leading-relaxed mb-8 text-lg">
                      {service.longDesc}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Features */}
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          What&apos;s Included
                        </h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-teal-600 text-xs">✓</span>
                              </div>
                              <span className="text-dark/80">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-secondary rounded-full"></span>
                          Key Benefits
                        </h4>
                        <ul className="space-y-3">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-blue-600 text-xs">★</span>
                              </div>
                              <span className="text-dark/80">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                      <Button
                        variant="primary"
                        onClick={handleBookAppointment}
                        className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Book This Service
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-blue to-secondary-teal">
        <div className="container">
          <div className="text-center">
            <h2 className="text-white text-3xl font-bold mb-4">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Don&apos;t wait to achieve the healthy, confident smile you
              deserve. Contact us today to schedule your appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                onClick={handleBookAppointment}
                className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                📞 Book Appointment Now
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
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
