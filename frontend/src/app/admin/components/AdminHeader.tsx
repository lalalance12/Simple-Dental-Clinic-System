import React from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onExportData?: () => void;
  onAddNew?: () => void;
  exportLabel?: string;
}

export default function AdminHeader({
  title,
  subtitle = "Manage your dental clinic operations",
  onExportData,
  onAddNew,
  exportLabel = "Export Data",
}: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-600 leading-tight">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          {onExportData && (
            <button
              onClick={onExportData}
              className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              {exportLabel}
            </button>
          )}
          {onAddNew && (
            <button
              onClick={onAddNew}
              className="px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Add Appointment
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
