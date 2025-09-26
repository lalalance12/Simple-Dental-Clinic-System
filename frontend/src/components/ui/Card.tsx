import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "service";
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  onClick,
}) => {
  const baseClasses = variant === "service" ? "card-service" : "card";

  return (
    <div
      className={`${baseClasses} ${className}`}
      {...(onClick && { onClick, role: "button", tabIndex: 0 })}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  onClick,
  className = "",
}) => {
  return (
    <Card variant="service" onClick={onClick} className={className}>
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center text-secondary">
            {icon}
          </div>
        </div>
      )}
      <h3 className="h3 text-center mb-2">{title}</h3>
      <p className="body-text text-center text-dark">{description}</p>
      {onClick && (
        <div className="mt-4 text-center">
          <span className="text-secondary font-medium">Learn More →</span>
        </div>
      )}
    </Card>
  );
};
