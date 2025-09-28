"use client";

import React, { useState, useEffect } from "react";
import { api, Client } from "../../../lib/api";

function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await api.getClients();
        setClients(data);
        setError(null);
      } catch (err) {
        setError("Failed to load clients. Please try again later.");
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "Not provided";
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
        <p className="mt-2 text-dark/70">Loading clients...</p>
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
          Total: {clients.length} clients
        </div>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">👥</div>
          <h3 className="text-lg font-semibold text-dark mb-2">
            No clients yet
          </h3>
          <p className="text-sm text-dark/70">
            Clients will appear here once they start booking appointments.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-dark text-base">
                    {client.firstName} {client.lastName}
                  </h3>
                  <p className="text-dark/70 text-xs">{client.email}</p>
                  <p className="text-dark/70 text-xs">{client.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-dark/70">Client ID</p>
                  <p className="font-mono text-xs">#{client.id}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-dark/70">Date of Birth</p>
                  <p className="font-medium text-sm">
                    {formatDate(client.dateOfBirth || "")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-dark/70">Emergency Contact</p>
                  <p className="font-medium text-sm">
                    {client.emergencyContact || "Not provided"}
                  </p>
                </div>
              </div>

              {client.address && (
                <div className="mb-3">
                  <p className="text-xs text-dark/70">Address</p>
                  <p className="text-sm">{client.address}</p>
                </div>
              )}

              {client.medicalHistory && (
                <div>
                  <p className="text-xs text-dark/70">Medical History</p>
                  <p className="text-xs bg-gray-50 p-2 rounded-md">
                    {client.medicalHistory}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientsList;
