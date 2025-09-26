import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const ToothIcon: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 4C18 4 14 8 14 14V28C14 34 18 38 24 38C30 38 34 34 34 28V14C34 8 30 4 24 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 16C20 14 22 12 24 12C26 12 28 14 28 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M22 22C22 20 24 18 24 18C24 18 26 20 26 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CleaningIcon: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 12L32 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 8L28 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 8V4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2" />
    <path
      d="M18 20L22 24L30 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ImplantIcon: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 32V16C16 12 20 8 24 8C28 8 32 12 32 16V32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="24" cy="36" r="8" stroke="currentColor" strokeWidth="2" />
    <path
      d="M20 36H28"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const WhiteningIcon: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 8L16 16H32L24 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="20"
      y="16"
      width="8"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="28" r="2" fill="currentColor" />
    <circle cx="24" cy="34" r="2" fill="currentColor" />
  </svg>
);

export const CheckupIcon: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
    <path
      d="M18 24L22 28L30 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 8H32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 4V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M28 4V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3 10H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C15.72 20.4 10.4 15.72 9.8 10.52C9.8 9.92 10.28 9.44 10.88 9.44H13.88C14.18 9.44 14.46 9.58 14.62 9.82C15.18 10.66 15.92 11.4 16.76 11.96C16.96 12.08 17.08 12.3 17.08 12.54V15.54C17.08 15.94 16.68 16.22 16.32 16.08C15.52 15.78 14.78 15.04 14.48 14.24C14.34 13.88 14.02 13.64 13.62 13.64H12.62C12.42 13.64 12.24 13.7 12.08 13.8C11.52 16.32 13.68 18.48 16.2 17.92C16.3 17.76 16.36 17.58 16.36 17.38V16.38C16.36 15.98 16.64 15.58 17.04 15.74C17.68 15.98 18.32 16.22 18.96 16.46C19.2 16.54 19.38 16.74 19.38 17V17.92H22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
