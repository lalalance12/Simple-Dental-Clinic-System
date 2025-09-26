"use client";

import React, { useState } from "react";
import {
  Header,
  Footer,
  Button,
  Input,
  Textarea,
  Card,
  ToothIcon,
  CalendarIcon,
  PhoneIcon,
  LocationIcon,
} from "../../components/ui";

const contactMethods = [
  {
    icon: <PhoneIcon size={32} className="text-white" />,
    title: "Phone",
    primary: "(555) 123-4567",
    secondary: "Emergency: (555) 123-4568",
    description: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    action: "tel:(555) 123-4567",
    buttonText: "Call Now",
  },
  {
    icon: <LocationIcon size={32} className="text-white" />,
    title: "Visit Us",
    primary: "123 Dental Street",
    secondary: "Smile City, SC 12345",
    description: "Free parking available on-site",
    action: "#location",
    buttonText: "Get Directions",
  },
  {
    icon: <CalendarIcon size={32} className="text-white" />,
    title: "Book Online",
    primary: "Same-Day Appointments",
    secondary: "Available for emergencies",
    description: "24/7 emergency care available",
    action: "/book-appointment",
    buttonText: "Book Appointment",
  },
];

const faqs = [
  {
    question: "What should I bring to my appointment?",
    answer:
      "Please bring your ID, insurance card (if applicable), and any relevant medical records. If you're a new patient, arrive 15 minutes early to complete paperwork.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Yes, we accept most major dental insurance plans. Our staff will help verify your coverage and explain any out-of-pocket costs before treatment begins.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, credit cards (Visa, MasterCard, American Express), debit cards, and personal checks. We also offer financing options for larger procedures.",
  },
  {
    question: "How do I prepare for my dental procedure?",
    answer:
      "Eat a light meal before your appointment, avoid smoking, and inform us of any medications you're taking. If you're receiving sedation, arrange for someone to drive you home.",
  },
  {
    question: "What should I do in case of a dental emergency?",
    answer:
      "For dental emergencies outside regular hours, call our emergency line at (555) 123-4568. We're available 24/7 for urgent dental care.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert(
        "Thank you for your message! We will get back to you within 24 hours."
      );
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header currentPage="contact" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary-blue to-secondary-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-white text-sm font-medium">
                📞 Get In Touch
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Contact Fresh Confidence Dental
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              We&apos;re here to help you achieve and maintain a healthy, beautiful
              smile. Reach out to us with any questions, concerns, or to
              schedule your appointment. Our friendly team is ready to assist
              you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-lg text-dark/80 max-w-2xl mx-auto">
              Choose the contact method that works best for you. We&apos;re available
              through various channels to ensure you can reach us when you need
              us most.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-blue to-secondary-teal mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-secondary-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">
                  {method.title}
                </h3>
                <p className="text-primary font-semibold text-lg mb-1">
                  {method.primary}
                </p>
                <p className="text-secondary font-medium mb-3">
                  {method.secondary}
                </p>
                <p className="text-dark/70 mb-6">{method.description}</p>
                <Button
                  variant={
                    index === 0
                      ? "primary"
                      : index === 1
                      ? "secondary"
                      : "primary"
                  }
                  onClick={() => {
                    if (method.action.startsWith("tel:")) {
                      window.location.href = method.action;
                    } else if (method.action.startsWith("/")) {
                      window.location.href = method.action;
                    } else {
                      // Handle other actions like scrolling to location
                      document
                        .querySelector(method.action)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full"
                >
                  {method.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-dark mb-4">
                  Send Us a Message
                </h2>
                <p className="text-dark/80 leading-relaxed">
                  Have a question or need more information? Fill out the form
                  below and we&apos;ll get back to you within 24 hours. We&apos;re here to
                  help with all your dental care needs.
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(value) => handleInputChange("name", value)}
                      required
                    />

                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(value) => handleInputChange("email", value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      type="tel"
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(value) => handleInputChange("phone", value)}
                    />

                    <Input
                      label="Subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(value) => handleInputChange("subject", value)}
                      required
                    />
                  </div>

                  <Textarea
                    label="Message"
                    placeholder="Tell us about your dental concerns or questions..."
                    value={formData.message}
                    onChange={(value) => handleInputChange("message", value)}
                    rows={6}
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "📤 Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Map & Office Hours */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-dark mb-4">
                  Find Our Location
                </h2>
                <p className="text-dark/80 leading-relaxed">
                  Located in the heart of Smile City, our modern facility is
                  easily accessible with free parking and public transportation
                  options nearby.
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-teal-50 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-blue-400 rounded-full"></div>
                    <div className="absolute top-3/4 right-1/4 w-12 h-12 border-2 border-teal-400 rounded-full"></div>
                    <div className="absolute top-1/2 left-3/4 w-8 h-8 bg-primary rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-center h-full relative z-10">
                    <div className="text-center p-8">
                      <LocationIcon
                        size={48}
                        className="text-secondary mx-auto mb-4"
                      />
                      <h3 className="text-2xl font-bold text-dark mb-2">
                        Interactive Map
                      </h3>
                      <p className="text-dark/80 mb-4">
                        Click to view in Google Maps
                      </p>
                      <p className="text-primary font-medium">
                        📍 123 Dental Street, Smile City, SC 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <Card className="p-8">
                <h3 className="text-2xl font-semibold text-dark mb-6 flex items-center gap-3">
                  <CalendarIcon size={24} className="text-primary" />
                  Office Hours
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-dark">
                      Monday - Friday
                    </span>
                    <span className="text-secondary font-semibold">
                      8:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-dark">Saturday</span>
                    <span className="text-secondary font-semibold">
                      9:00 AM - 3:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-dark">Sunday</span>
                    <span className="text-red-500 font-semibold">Closed</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-teal-800">
                        24/7 Emergency Care
                      </p>
                      <p className="text-teal-700 text-sm">
                        Call (555) 123-4568 for urgent dental needs
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-dark/80 max-w-2xl mx-auto">
              Find answers to common questions about our services, appointments,
              and policies.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-blue to-secondary-teal mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-dark mb-3">
                  {faq.question}
                </h3>
                <p className="text-dark/80 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
