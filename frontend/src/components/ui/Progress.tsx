import React from "react";

interface ProgressStep {
  id: string | number;
  label?: string;
  completed?: boolean;
  active?: boolean;
}

interface ProgressStepperProps {
  steps: ProgressStep[];
  className?: string;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  className = "",
}) => {
  return (
    <div className={`progress-stepper ${className}`}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center">
          {/* Step Circle */}
          <div
            className={`progress-step ${
              step.completed ? "completed" : step.active ? "active" : ""
            }`}
            aria-label={`Step ${index + 1}${
              step.label ? `: ${step.label}` : ""
            }${
              step.completed
                ? " - Completed"
                : step.active
                ? " - Current step"
                : ""
            }`}
          >
            {step.completed ? "✓" : index + 1}
          </div>

          {/* Step Label */}
          {step.label && (
            <span className="text-xs text-center mt-2 text-dark max-w-16">
              {step.label}
            </span>
          )}

          {/* Connecting Line (except for last step) */}
          {index < steps.length - 1 && (
            <div className="absolute top-5 left-1/2 w-full h-0.5 bg-light transform translate-x-1/2 -z-10" />
          )}
        </div>
      ))}
    </div>
  );
};
