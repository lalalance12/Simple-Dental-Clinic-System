"use client";

import React from "react";
import { Appointment } from "../../../lib/api";

interface DeleteAppointmentModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteAppointmentModal({
  appointment,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteAppointmentModalProps) {
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
        <div className="relative z-50 w-full max-w-sm bg-white rounded-lg shadow-xl transform transition-all">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-8 w-8 rounded-full mr-3">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-600">
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Delete Appointment
              </h3>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Close modal"
            >
              <svg
                className="w-5 h-5"
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
          <div className="px-4 py-3">
            <p className="text-sm text-gray-600 mb-3">
              Are you sure you want to delete this appointment? This action
              cannot be undone.
            </p>

            {/* Appointment Summary */}
            <div className="bg-gray-50 rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {appointment.client.firstName.charAt(0)}
                        {appointment.client.lastName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {appointment.client.firstName}{" "}
                      {appointment.client.lastName}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {formatDate(appointment.date)} •{" "}
                      {formatTime(appointment.time)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {appointment.appointmentServices?.length || 0} service(s)
                      {appointment.appointmentServices &&
                        appointment.appointmentServices.length > 0 && (
                          <span className="ml-1">
                            • ₱
                            {appointment.appointmentServices
                              .reduce((sum, as) => sum + as.service.price, 0)
                              .toLocaleString()}
                          </span>
                        )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isDeleting ? (
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
                  Deleting...
                </>
              ) : (
                "Delete Appointment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
