"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AppointmentsList from "./components/AppointmentsList";
import ClientsList from "./components/ClientsList";
import { api, Appointment, Client } from "../../lib/api";

type AdminView = "appointments" | "clients";

export default function AdminDashboard() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<AdminView>("appointments");
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  // Fetch stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [appointments, clients] = await Promise.all([
          api.getAppointments(),
          api.getClients(),
        ]);
        setAppointmentsCount(appointments.length);
        setClientsCount(clients.length);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Navigation handlers
  const handleAddNew = () => {
    router.push("/admin/add-appointment");
    console.log("Add appointment clicked");
  };

  const renderContent = () => {
    switch (currentView) {
      case "appointments":
        return <AppointmentsList />;
      case "clients":
        return <ClientsList />;
      default:
        return <AppointmentsList />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "appointments":
        return "Appointments";
      case "clients":
        return "Clients";
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Full height left side */}
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        appointmentsCount={appointmentsCount}
        clientsCount={clientsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <AdminHeader title={getPageTitle()} onAddNew={handleAddNew} />

        {/* Content Area - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
