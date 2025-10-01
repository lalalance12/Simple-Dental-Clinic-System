"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  ProgressStepper,
  Input,
  Textarea,
} from "../../../components/ui";
import { api, Service } from "../../../lib/api";

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
  { id: 4, label: "Confirm", completed: false, active: false },
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
}

export default function AdminAddAppointmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmationAccepted, setConfirmationAccepted] = useState(false);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const fetchedServices = await api.getServices();
        setServices(fetchedServices);
        setErrors({});
      } catch (err) {
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
        break;

      case 2: // Services
        if (bookingData.selectedServices.length === 0)
          newErrors.services = "Please select at least one service";
        break;

      case 3: // Schedule
        if (!bookingData.preferredDate)
          newErrors.preferredDate = "Please select a date";
        else {
          const selectedDate = new Date(bookingData.preferredDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set to start of today

          if (selectedDate < today) {
            newErrors.preferredDate = "Please select today or a future date";
          }
        }
        if (!bookingData.preferredTime)
          newErrors.preferredTime = "Please select a time";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      const newStep = Math.min(currentStep + 1, 4);
      setCurrentStep(newStep);
    }
  };

  const prevStep = () => {
    const newStep = Math.max(currentStep - 1, 1);
    setCurrentStep(newStep);
  };

  const calculateTotal = () => {
    return bookingData.selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === parseInt(serviceId));
      return total + (Number(service?.price) || 0);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!confirmationAccepted) {
      return;
    }

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

        alert("Appointment booked successfully!");
        router.push("/admin");
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
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-dark mb-3">
                Patient Information
              </h2>
              <p className="text-dark/80 text-sm">
                Enter patient details for the appointment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="Enter first name"
                value={bookingData.firstName}
                onChange={(value) => updateBookingData("firstName", value)}
                error={errors.firstName}
                required
              />

              <Input
                label="Last Name"
                placeholder="Enter last name"
                value={bookingData.lastName}
                onChange={(value) => updateBookingData("lastName", value)}
                error={errors.lastName}
                required
              />

              <Input
                type="email"
                label="Email Address"
                placeholder="Enter email"
                value={bookingData.email}
                onChange={(value) => updateBookingData("email", value)}
                error={errors.email}
                required
              />

              <Input
                type="tel"
                label="Phone Number"
                placeholder="Enter phone number"
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
              placeholder="Enter full address"
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
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-dark mb-3">
                Select Services
              </h2>
              <p className="text-dark/80 text-sm">
                Choose the dental services for this appointment.
              </p>
            </div>

            {errors.services && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
                {errors.services}
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-dark/70">Loading services...</p>
              </div>
            ) : (
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
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-dark mb-3">
                Schedule Appointment
              </h2>
              <p className="text-dark/80 text-sm">
                Select the preferred date and time for the appointment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="preferred-date"
                  className="block text-dark font-medium mb-2 text-sm"
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
              placeholder="Any special requests or concerns..."
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
                Confirm Appointment
              </h2>
              <p className="text-dark/70 text-base max-w-md mx-auto">
                Please review all appointment details carefully before
                confirming.
              </p>
            </div>

            <div className="space-y-6">
              {/* Patient Information */}
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-semibold text-dark text-base">
                    Patient Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm block mb-1">
                      Name
                    </span>
                    <span className="font-medium text-dark text-sm">
                      {bookingData.firstName} {bookingData.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm block mb-1">
                      Email
                    </span>
                    <span className="font-medium text-dark text-sm break-words">
                      {bookingData.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm block mb-1">
                      Phone
                    </span>
                    <span className="font-medium text-dark text-sm">
                      {bookingData.phone}
                    </span>
                  </div>
                  {bookingData.dateOfBirth && (
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">
                        Date of Birth
                      </span>
                      <span className="font-medium text-dark text-sm">
                        {bookingData.dateOfBirth}
                      </span>
                    </div>
                  )}
                  {bookingData.emergencyContact && (
                    <div className="col-span-2">
                      <span className="text-gray-600 text-sm block mb-1">
                        Emergency Contact
                      </span>
                      <span className="font-medium text-dark text-sm break-words">
                        {bookingData.emergencyContact}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Services & Schedule */}
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    2
                  </div>
                  <h3 className="font-semibold text-dark text-base">
                    Services & Schedule
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <span className="text-gray-600 text-sm block mb-2">
                      Services
                    </span>
                    <div className="space-y-1">
                      {bookingData.selectedServices.map((serviceId) => {
                        const service = services.find(
                          (s) => s.id === parseInt(serviceId)
                        );
                        return (
                          <div
                            key={serviceId}
                            className="text-sm font-medium text-dark bg-blue-50 px-3 py-1 rounded-md inline-block mr-2 mb-1"
                          >
                            {service?.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm block mb-1">
                      Date
                    </span>
                    <span className="font-medium text-dark text-sm">
                      {bookingData.preferredDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm block mb-1">
                      Time
                    </span>
                    <span className="font-medium text-dark text-sm">
                      {bookingData.preferredTime}
                    </span>
                  </div>
                  {bookingData.notes && (
                    <div className="col-span-2">
                      <span className="text-gray-600 text-sm block mb-1">
                        Notes
                      </span>
                      <p className="text-sm text-dark bg-gray-50 p-2 rounded-md">
                        {bookingData.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Summary */}
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    3
                  </div>
                  <h3 className="font-semibold text-dark text-base">
                    Appointment Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm block mb-2">
                      Service Breakdown
                    </span>
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
                            <span className="text-dark">{service?.name}</span>
                            <span className="font-medium text-dark">
                              ₱{service?.price?.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        ₱{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-8">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => setConfirmationAccepted(!confirmationAccepted)}
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    confirmationAccepted
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-blue-300 hover:border-blue-400"
                  }`}
                  aria-label="Confirm appointment details"
                >
                  {confirmationAccepted && (
                    <svg
                      className="w-2 h-2 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <div className="flex-1">
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    Confirm Appointment Details
                  </p>
                  <p className="text-sm text-blue-700">
                    By confirming this appointment, you acknowledge that all
                    information provided is accurate and the patient has been
                    informed of their appointment details.
                  </p>
                </div>
              </div>
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
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
            >
              ← Back to Admin
            </button>
          </div>
          <div className="justify-center text-center">
            <h1 className="text-lg font-bold text-gray-900">
              Add New Appointment
            </h1>
            <p className="text-xs text-gray-600 mt-0.5">
              Admin appointment booking
            </p>
          </div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Progress and Form */}
      <section className="py-8">
        <div className="container max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <ProgressStepper
              steps={progressSteps.map((step) => ({
                ...step,
                completed: step.id < currentStep,
                active: step.id === currentStep,
              }))}
            />
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 text-sm"
              >
                ← Previous
              </Button>

              <Button
                variant="primary"
                onClick={currentStep === 4 ? handleSubmit : nextStep}
                disabled={
                  submitting || (currentStep === 4 && !confirmationAccepted)
                }
                className="px-6 py-2 text-sm"
              >
                {submitting ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking...
                  </>
                ) : currentStep === 4 ? (
                  "Confirm & Book Appointment"
                ) : (
                  "Next →"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
