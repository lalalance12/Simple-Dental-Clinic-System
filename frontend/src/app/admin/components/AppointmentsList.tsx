"use client";

import React, { useState, useEffect } from "react";
import { api, Appointment } from "../../../lib/api";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await api.getAppointments();
        setAppointments(data);
        setError(null);
      } catch (err) {
        setError("Failed to load appointments. Please try again later.");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-dark/70">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs text-gray-600">
          Total: {appointments.length} appointments
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📅</div>
          <h3 className="text-lg font-semibold text-dark mb-2">
            No appointments yet
          </h3>
          <p className="text-sm text-dark/70">
            Appointments will appear here once clients start booking.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-dark text-base">
                    {appointment.client.firstName} {appointment.client.lastName}
                  </h3>
                  <p className="text-dark/70 text-xs">
                    {appointment.client.email}
                  </p>
                  <p className="text-dark/70 text-xs">
                    {appointment.client.phone}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-xs text-dark/70">Date</p>
                  <p className="font-medium text-sm">
                    {formatDate(
                      appointment.date instanceof Date
                        ? appointment.date.toISOString()
                        : appointment.date
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-dark/70">Time</p>
                  <p className="font-medium text-sm">{appointment.time}</p>
                </div>
                <div>
                  <p className="text-xs text-dark/70">Services</p>
                  <p className="font-medium text-sm">
                    {appointment.appointmentServices?.length || 0} service(s)
                  </p>
                </div>
              </div>

              {appointment.notes && (
                <div className="mb-3">
                  <p className="text-xs text-dark/70">Notes</p>
                  <p className="text-xs bg-gray-50 p-2 rounded-md">
                    {appointment.notes}
                  </p>
                </div>
              )}

              {appointment.appointmentServices &&
                appointment.appointmentServices.length > 0 && (
                  <div>
                    <p className="text-xs text-dark/70 mb-1.5">Services:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {appointment.appointmentServices.map((as) => (
                        <span
                          key={as.id}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          {as.service.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
