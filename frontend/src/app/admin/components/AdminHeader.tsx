import React from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onAddNew?: () => void;
}

export default function AdminHeader({
  title,
  subtitle = "Manage your dental clinic operations",
  onAddNew,
}: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-600 leading-tight">{subtitle}</p>
        </div>
        <div className="flex items-center">
          {onAddNew && (
            <button
              onClick={onAddNew}
              className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 hover:shadow-md transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                className="w-4 h-4 mr-2 transform group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Appointment
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
