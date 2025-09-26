import React from "react";

interface InputProps {
  type?: "text" | "email" | "tel" | "password" | "date";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  className = "",
  id,
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-dark font-medium mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`form-input ${hasError ? "form-error" : ""}`}
        {...(hasError && {
          "aria-invalid": "true",
          "aria-describedby": `${inputId}-error`,
        })}
      />
      {hasError && (
        <div
          id={`${inputId}-error`}
          className="form-error-message"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  id?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  rows = 4,
  className = "",
  id,
}) => {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-dark font-medium mb-2"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`form-input resize-none ${hasError ? "form-error" : ""}`}
        {...(hasError && {
          "aria-invalid": "true",
          "aria-describedby": `${textareaId}-error`,
        })}
      />
      {hasError && (
        <div
          id={`${textareaId}-error`}
          className="form-error-message"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  error,
  required = false,
  className = "",
  id,
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-dark font-medium mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`form-input appearance-none bg-white cursor-pointer ${
          hasError ? "form-error" : ""
        }`}
        {...(hasError && {
          "aria-invalid": "true",
          "aria-describedby": `${selectId}-error`,
        })}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div
          id={`${selectId}-error`}
          className="form-error-message"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};
