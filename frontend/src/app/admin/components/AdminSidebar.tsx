import React from "react";

type AdminView = "appointments" | "clients";

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  appointmentsCount?: number;
  clientsCount?: number;
}

export default function AdminSidebar({
  currentView,
  onViewChange,
  appointmentsCount = 0,
  clientsCount = 0,
}: AdminSidebarProps) {
  return (
    <div className="w-56 bg-white shadow-lg flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-3 border-b border-gray-200">
        <h2 className="text-xs font-bold text-gray-900">Admin</h2>
        <p className="text-xs text-gray-600 mt-0.5">Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          <button
            onClick={() => onViewChange("appointments")}
            className={`w-full text-left px-2 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
              currentView === "appointments"
                ? "bg-primary text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            📅 Appointments
          </button>

          <button
            onClick={() => onViewChange("clients")}
            className={`w-full text-left px-2 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
              currentView === "clients"
                ? "bg-primary text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            👥 Clients
          </button>
        </div>
      </nav>

      {/* Stats Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          <p className="font-medium mb-2 text-gray-900">Quick Stats</p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Total Appointments:</span>
              <span className="font-bold text-primary">
                {appointmentsCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Clients:</span>
              <span className="font-bold text-primary">{clientsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
