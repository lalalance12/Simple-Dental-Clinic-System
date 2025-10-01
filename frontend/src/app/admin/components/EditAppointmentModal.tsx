"use client";

import React, { useState, useEffect } from "react";
import { Appointment, Service, api } from "../../../lib/api";

interface EditAppointmentModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    updatedAppointment: Partial<Appointment & { serviceIds: number[] }>
  ) => void;
  isSaving?: boolean;
}

export default function EditAppointmentModal({
  appointment,
  isOpen,
  onClose,
  onSave,
  isSaving = false,
}: EditAppointmentModalProps) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    status: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  useEffect(() => {
    if (appointment && isOpen) {
      setFormData({
        date:
          appointment.date instanceof Date
            ? appointment.date.toISOString().split("T")[0]
            : new Date(appointment.date).toISOString().split("T")[0],
        time: appointment.time,
        status: appointment.status,
        notes: appointment.notes || "",
      });
      setSelectedServices(
        appointment.appointmentServices?.map((as) => as.service.id) || []
      );
      setErrors({});

      // Fetch available services
      const fetchServices = async () => {
        try {
          const services = await api.getServices();
          setAvailableServices(services);
        } catch (error) {
          console.error("Failed to fetch services:", error);
        }
      };
      fetchServices();
    }
  }, [appointment, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    if (selectedServices.length === 0) {
      newErrors.services = "At least one service must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({
      ...appointment,
      date: new Date(formData.date),
      time: formData.time,
      status: formData.status,
      notes: formData.notes,
      serviceIds: selectedServices,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) => {
      const newSelected = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];

      // Clear or set services error based on selection
      if (newSelected.length > 0) {
        if (errors.services) {
          setErrors((prev) => ({ ...prev, services: "" }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          services: "At least one service must be selected",
        }));
      }

      return newSelected;
    });
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-3xl transition-opacity"
        style={{
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative z-50 w-full max-w-4xl bg-white rounded-xl shadow-2xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Edit Appointment
                </h2>
                <p className="text-sm text-gray-500">
                  Update appointment details and information
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isSaving}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6">
              {/* Client Info Display */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                    <span className="text-sm font-semibold text-white">
                      {appointment.client.firstName.charAt(0)}
                      {appointment.client.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {appointment.client.firstName}{" "}
                      {appointment.client.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.client.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.date ? "border-red-300" : "border-gray-300"
                    }`}
                    disabled={isSaving}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.time ? "border-red-300" : "border-gray-300"
                    }`}
                    disabled={isSaving}
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status *
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.status ? "border-red-300" : "border-gray-300"
                    }`}
                    disabled={isSaving}
                  >
                    <option value="">Select status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                  )}
                </div>
              </div>

              {/* Services Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services ({selectedServices.length} selected) *
                </label>
                {errors.services && (
                  <p className="mt-1 text-sm text-red-800 font-medium">
                    {errors.services}
                  </p>
                )}
                <div
                  className={`bg-gray-50 rounded-lg p-4 ${
                    errors.services ? "border border-red-300" : ""
                  }`}
                >
                  {/* Scrollable Services List */}
                  <div className="max-h-80 overflow-y-auto">
                    {availableServices.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        Loading services...
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {availableServices.map((service) => {
                          const isSelected = selectedServices.includes(
                            service.id
                          );
                          return (
                            <div
                              key={service.id}
                              onClick={() => handleServiceToggle(service.id)}
                              className={`rounded-lg p-4 border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? "bg-green-50 border-green-200 shadow-sm"
                                  : "bg-white border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h5 className="text-sm font-semibold text-gray-900">
                                      {service.name}
                                    </h5>
                                    {isSelected && (
                                      <svg
                                        className="h-4 w-4 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 mb-2">
                                    {service.description}
                                  </p>
                                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                                    <svg
                                      className="h-3 w-3"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <span>{service.duration}</span>
                                  </div>
                                </div>
                                <div className="text-right ml-3">
                                  <p
                                    className={`text-sm font-bold ${
                                      isSelected
                                        ? "text-green-700"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    ₱{Number(service.price).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Fixed Total Amount - Outside Scrollable Area */}
                  {selectedServices.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-300 bg-white rounded-b-lg -mx-4 -mb-4 px-4 pb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Total Amount
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          ₱
                          {availableServices
                            .filter((service) =>
                              selectedServices.includes(service.id)
                            )
                            .reduce(
                              (sum, service) => sum + Number(service.price),
                              0
                            )
                            .toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Add any additional notes about this appointment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
