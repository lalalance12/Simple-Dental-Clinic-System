"use client";

import React from "react";
import { Appointment } from "../../../lib/api";

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentDetailsModal({
  appointment,
  isOpen,
  onClose,
}: AppointmentDetailsModalProps) {
  if (!isOpen || !appointment) return null;

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    // Convert 24-hour time to 12-hour format
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const calculateTotalPrice = () => {
    if (!appointment.appointmentServices) return 0;
    const total = appointment.appointmentServices.reduce(
      (sum, as) => sum + as.service.price,
      0
    );
    return total;
  };

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
        <div className="relative z-50 w-full max-w-3xl bg-white rounded-lg shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">
              Appointment Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
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

          {/* Content */}
          <div className="px-4 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column - Appointment Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Appointment Information
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Status
                      </span>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Date
                        </span>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatDate(appointment.date)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Time
                        </span>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatTime(appointment.time)}
                        </p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Notes
                        </span>
                        <p className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded-md">
                          {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Services
                  </h4>
                  <div className="space-y-2">
                    {appointment.appointmentServices?.map((as) => (
                      <div
                        key={as.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-gray-900">
                            {as.service.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {as.service.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {as.service.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            ₱{as.service.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )) || (
                      <p className="text-sm text-gray-500">
                        No services assigned
                      </p>
                    )}
                  </div>

                  {appointment.appointmentServices &&
                    appointment.appointmentServices.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">
                            Total Amount
                          </span>
                          <span className="text-base font-bold text-gray-900">
                            ₱{calculateTotalPrice().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Right Column - Client Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Client Information
                  </h4>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-primary">
                          {appointment.client.firstName.charAt(0)}
                          {appointment.client.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h5 className="text-base font-semibold text-gray-900">
                          {appointment.client.firstName}{" "}
                          {appointment.client.lastName}
                        </h5>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Email
                        </span>
                        <p className="text-sm text-gray-900">
                          {appointment.client.email}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Phone
                        </span>
                        <p className="text-sm text-gray-900">
                          {appointment.client.phone}
                        </p>
                      </div>

                      {appointment.client.dateOfBirth && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Date of Birth
                          </span>
                          <p className="text-sm text-gray-900">
                            {new Date(
                              appointment.client.dateOfBirth
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      )}

                      {appointment.client.address && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Address
                          </span>
                          <p className="text-sm text-gray-900">
                            {appointment.client.address}
                          </p>
                        </div>
                      )}

                      {appointment.client.emergencyContact && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Emergency Contact
                          </span>
                          <p className="text-sm text-gray-900">
                            {appointment.client.emergencyContact}
                          </p>
                        </div>
                      )}

                      {appointment.client.medicalHistory && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Medical History
                          </span>
                          <p className="text-sm text-gray-900 bg-white p-2 rounded border mt-1">
                            {appointment.client.medicalHistory}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
