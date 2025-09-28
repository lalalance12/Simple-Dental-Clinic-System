"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Header,
  Footer,
  ProgressStepper,
  Input,
  Textarea,
} from "../../components/ui";
import { api, Service } from "../../lib/api";

// Services will be fetched from API

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const progressSteps = [
  { id: 1, label: "Patient Info", completed: false, active: true },
  { id: 2, label: "Services", completed: false, active: false },
  { id: 3, label: "Schedule", completed: false, active: false },
  { id: 4, label: "Payment", completed: false, active: false },
  { id: 5, label: "Confirm", completed: false, active: false },
];

interface BookingData {
  // Patient Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;

  // Services
  selectedServices: string[];

  // Schedule
  preferredDate: string;
  preferredTime: string;
  notes: string;

  // Payment
  paymentMethod: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
}

export default function BookAppointmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
    selectedServices: [],
    preferredDate: "",
    preferredTime: "",
    notes: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const fetchedServices = await api.getServices();
        setServices(fetchedServices);
        setError(null);
      } catch (err) {
        setError("Failed to load services. Please try again later.");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const updateBookingData = (field: string, value: string | string[]) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleService = (serviceId: number) => {
    const currentServices = bookingData.selectedServices;
    const serviceIdStr = serviceId.toString();
    const newServices = currentServices.includes(serviceIdStr)
      ? currentServices.filter((id) => id !== serviceIdStr)
      : [...currentServices, serviceIdStr];
    updateBookingData("selectedServices", newServices);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Patient Info
        if (!bookingData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!bookingData.lastName.trim())
          newErrors.lastName = "Last name is required";
        if (!bookingData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(bookingData.email))
          newErrors.email = "Please enter a valid email";
        if (!bookingData.phone.trim())
          newErrors.phone = "Phone number is required";
        if (!bookingData.dateOfBirth.trim())
          newErrors.dateOfBirth = "Date of birth is required";
        break;

      case 2: // Services
        if (bookingData.selectedServices.length === 0)
          newErrors.services = "Please select at least one service";
        break;

      case 3: // Schedule
        if (!bookingData.preferredDate)
          newErrors.preferredDate = "Please select a date";
        if (!bookingData.preferredTime)
          newErrors.preferredTime = "Please select a time";
        break;

      case 4: // Payment
        if (!bookingData.cardNumber.trim())
          newErrors.cardNumber = "Card number is required";
        if (!bookingData.expiryDate.trim())
          newErrors.expiryDate = "Expiry date is required";
        if (!bookingData.cvv.trim()) newErrors.cvv = "CVV is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      const newStep = Math.min(currentStep + 1, 5);
      setCurrentStep(newStep);
      updateProgressSteps(newStep);
    }
  };

  const prevStep = () => {
    const newStep = Math.max(currentStep - 1, 1);
    setCurrentStep(newStep);
    updateProgressSteps(newStep);
  };

  const updateProgressSteps = (activeStep: number) => {
    // Update the progressSteps array (in a real app, this would be state)
    progressSteps.map((step) => ({
      ...step,
      completed: step.id < activeStep,
      active: step.id === activeStep,
    }));
  };

  const calculateTotal = () => {
    return bookingData.selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === parseInt(serviceId));
      return total + (service?.price || 0);
    }, 0);
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        setSubmitting(true);

        const appointmentPayload = {
          client: {
            firstName: bookingData.firstName,
            lastName: bookingData.lastName,
            email: bookingData.email,
            phone: bookingData.phone,
            dateOfBirth: bookingData.dateOfBirth || undefined,
            address: bookingData.address || undefined,
            emergencyContact: bookingData.emergencyContact || undefined,
            medicalHistory: bookingData.medicalHistory || undefined,
          },
          serviceIds: bookingData.selectedServices.map((id) => parseInt(id)),
          date: bookingData.preferredDate,
          time: bookingData.preferredTime,
          status: "scheduled",
          notes: bookingData.notes || undefined,
        };

        await api.createAppointment(appointmentPayload);

        alert(
          "Appointment booked successfully! You will receive a confirmation email shortly."
        );
        router.push("/");
      } catch (error) {
        console.error("Booking failed:", error);
        alert("Failed to book appointment. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark mb-4">
                Patient Information
              </h2>
              <p className="text-dark/80">
                Please provide your personal details for the appointment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                placeholder="Enter your first name"
                value={bookingData.firstName}
                onChange={(value) => updateBookingData("firstName", value)}
                error={errors.firstName}
                required
              />

              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={bookingData.lastName}
                onChange={(value) => updateBookingData("lastName", value)}
                error={errors.lastName}
                required
              />

              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={bookingData.email}
                onChange={(value) => updateBookingData("email", value)}
                error={errors.email}
                required
              />

              <Input
                type="tel"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={bookingData.phone}
                onChange={(value) => updateBookingData("phone", value)}
                error={errors.phone}
                required
              />

              <Input
                type="date"
                label="Date of Birth"
                value={bookingData.dateOfBirth}
                onChange={(value) => updateBookingData("dateOfBirth", value)}
                error={errors.dateOfBirth}
                required
              />

              <Input
                label="Emergency Contact"
                placeholder="Emergency contact name & phone"
                value={bookingData.emergencyContact}
                onChange={(value) =>
                  updateBookingData("emergencyContact", value)
                }
              />
            </div>

            <Textarea
              label="Address"
              placeholder="Enter your full address"
              value={bookingData.address}
              onChange={(value) => updateBookingData("address", value)}
              rows={3}
            />

            <Textarea
              label="Medical History (Optional)"
              placeholder="Please list any relevant medical conditions, allergies, or medications"
              value={bookingData.medicalHistory}
              onChange={(value) => updateBookingData("medicalHistory", value)}
              rows={4}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark mb-4">
                Select Services
              </h2>
              <p className="text-dark/80">
                Choose the dental services you need for your appointment.
              </p>
            </div>

            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-dark/70">Loading services...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      bookingData.selectedServices.includes(
                        service.id.toString()
                      )
                        ? "border-primary bg-blue-50 shadow-lg"
                        : "border-gray-200 hover:border-teal-200 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        id={`service-${service.id}`}
                        type="checkbox"
                        checked={bookingData.selectedServices.includes(
                          service.id.toString()
                        )}
                        onChange={() => toggleService(service.id)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={`service-${service.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <h3 className="font-semibold text-dark mb-2">
                          {service.name}
                        </h3>
                        <p className="text-sm text-dark/70 mb-2">
                          {service.duration || "Duration varies"}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ₱{service.price.toLocaleString()}
                        </p>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {bookingData.selectedServices.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-dark mb-2">
                  Selected Services:
                </h3>
                <ul className="space-y-1">
                  {bookingData.selectedServices.map((serviceId) => {
                    const service = services.find(
                      (s) => s.id === parseInt(serviceId)
                    );
                    return (
                      <li
                        key={serviceId}
                        className="flex justify-between text-sm"
                      >
                        <span>{service?.name}</span>
                        <span className="font-semibold">
                          ₱{service?.price?.toLocaleString()}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-blue-200 mt-3 pt-3 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>₱{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark mb-4">
                Schedule Appointment
              </h2>
              <p className="text-dark/80">
                Select your preferred date and time for the appointment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="preferred-date"
                  className="block text-dark font-medium mb-2"
                >
                  Preferred Date
                </label>
                <input
                  id="preferred-date"
                  type="date"
                  value={bookingData.preferredDate}
                  onChange={(e) =>
                    updateBookingData("preferredDate", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                  {...(errors.preferredDate && {
                    "aria-describedby": "date-error",
                  })}
                />
                {errors.preferredDate && (
                  <p id="date-error" className="text-red-500 text-sm mt-1">
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="preferred-time"
                  className="block text-dark font-medium mb-2"
                >
                  Preferred Time
                </label>
                <select
                  id="preferred-time"
                  value={bookingData.preferredTime}
                  onChange={(e) =>
                    updateBookingData("preferredTime", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                  {...(errors.preferredTime && {
                    "aria-describedby": "time-error",
                  })}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && (
                  <p id="time-error" className="text-red-500 text-sm mt-1">
                    {errors.preferredTime}
                  </p>
                )}
              </div>
            </div>

            <Textarea
              label="Additional Notes (Optional)"
              placeholder="Any special requests or concerns you'd like us to know about..."
              value={bookingData.notes}
              onChange={(value) => updateBookingData("notes", value)}
              rows={4}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark mb-4">
                Payment Information
              </h2>
              <p className="text-dark/80">
                Secure payment processing for your appointment.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-dark mb-4">
                Appointment Summary
              </h3>
              <div className="space-y-2">
                {bookingData.selectedServices.map((serviceId) => {
                  const service = services.find(
                    (s) => s.id === parseInt(serviceId)
                  );
                  return (
                    <div
                      key={serviceId}
                      className="flex justify-between text-sm"
                    >
                      <span>{service?.name}</span>
                      <span>₱{service?.price?.toLocaleString()}</span>
                    </div>
                  );
                })}
                <div className="border-t border-blue-200 pt-2 mt-4 flex justify-between font-bold">
                  <span>Total Amount:</span>
                  <span className="text-lg">
                    ₱{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="payment-method"
                  className="block text-dark font-medium mb-2"
                >
                  Payment Method
                </label>
                <select
                  id="payment-method"
                  value={bookingData.paymentMethod}
                  onChange={(e) =>
                    updateBookingData("paymentMethod", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={bookingData.cardNumber}
                  onChange={(value) => updateBookingData("cardNumber", value)}
                  error={errors.cardNumber}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={bookingData.expiryDate}
                    onChange={(value) => updateBookingData("expiryDate", value)}
                    error={errors.expiryDate}
                    required
                  />

                  <Input
                    label="CVV"
                    placeholder="123"
                    value={bookingData.cvv}
                    onChange={(value) => updateBookingData("cvv", value)}
                    error={errors.cvv}
                    required
                  />
                </div>
              </div>

              <Textarea
                label="Billing Address"
                placeholder="Enter billing address (same as patient address if not specified)"
                value={bookingData.billingAddress}
                onChange={(value) => updateBookingData("billingAddress", value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark mb-4">
                Confirm Your Appointment
              </h2>
              <p className="text-dark/80">
                Please review all details before confirming your appointment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Patient Information */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-dark mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    1
                  </span>
                  Patient Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> {bookingData.firstName}{" "}
                    {bookingData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {bookingData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {bookingData.phone}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {bookingData.dateOfBirth}
                  </p>
                  {bookingData.emergencyContact && (
                    <p>
                      <strong>Emergency Contact:</strong>{" "}
                      {bookingData.emergencyContact}
                    </p>
                  )}
                </div>
              </div>

              {/* Services & Schedule */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-dark mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm">
                    2
                  </span>
                  Services & Schedule
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Services:</strong>
                    <ul className="mt-1 ml-4">
                      {bookingData.selectedServices.map((serviceId) => {
                        const service = services.find(
                          (s) => s.id === parseInt(serviceId)
                        );
                        return <li key={serviceId}>{service?.name}</li>;
                      })}
                    </ul>
                  </div>
                  <p>
                    <strong>Date:</strong> {bookingData.preferredDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {bookingData.preferredTime}
                  </p>
                  {bookingData.notes && (
                    <p>
                      <strong>Notes:</strong> {bookingData.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 p-6 rounded-xl md:col-span-2">
                <h3 className="font-semibold text-dark mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                    3
                  </span>
                  Payment Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Method:</strong>{" "}
                      {bookingData.paymentMethod
                        .replace("_", " ")
                        .toUpperCase()}
                    </p>
                    <p>
                      <strong>Card:</strong> **** **** ****{" "}
                      {bookingData.cardNumber.slice(-4)}
                    </p>
                    <p>
                      <strong>Expires:</strong> {bookingData.expiryDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ₱{calculateTotal().toLocaleString()}
                    </div>
                    <div className="text-sm text-dark/70">Total Amount</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Important Notes:
              </h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Please arrive 15 minutes early for your appointment</li>
                <li>• Bring your ID and insurance card if applicable</li>
                <li>• Payment will be processed upon completion of services</li>
                <li>• Cancellation policy: 24 hours notice required</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header currentPage="book-appointment" />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-primary-blue to-secondary-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-white text-sm font-medium">
                📅 Book Your Appointment
              </span>
            </div>
            <h1 className="text-white text-4xl font-bold mb-4">
              Book The Appointment You Need
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Schedule your dental appointment in just a few simple steps.
              We&apos;ll take care of everything to ensure your visit is
              comfortable and convenient.
            </p>
          </div>
        </div>
      </section>

      {/* Progress and Form */}
      <section className="py-12">
        <div className="container max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <ProgressStepper
              steps={progressSteps.map((step) => ({
                ...step,
                completed: step.id < currentStep,
                active: step.id === currentStep,
              }))}
            />
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8 py-3"
              >
                ← Previous
              </Button>

              <Button
                variant="primary"
                onClick={currentStep === 5 ? handleSubmit : nextStep}
                disabled={submitting}
                className="px-8 py-3"
              >
                {submitting ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking...
                  </>
                ) : currentStep === 5 ? (
                  "Confirm & Book Appointment"
                ) : (
                  "Next →"
                )}
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
