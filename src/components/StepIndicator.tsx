
import React from "react";
import { User, Pen, FileText, Users } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { id: 1, name: "ABOUT", icon: <User size={18} /> },
    { id: 2, name: "SIGN UP", icon: <Pen size={18} /> },
    { id: 3, name: "ASSESS", icon: <FileText size={18} /> },
    { id: 4, name: "PROFILE", icon: <Users size={18} /> },
  ];

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-8 bottom-0 w-[2px] bg-gray-200 h-[calc(100%-40px)]"></div>

      {/* Steps */}
      <div className="flex flex-col space-y-16">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center relative">
            <div 
              className={`flex items-center justify-center h-12 w-12 rounded-full ${
                step.id === currentStep
                  ? "bg-gray-100 text-indigo-500"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.icon}
            </div>
            <div className="ml-4">
              <p className={`text-sm font-semibold ${
                step.id === currentStep
                  ? "text-black"
                  : "text-gray-500"
              }`}>
                STEP {step.id}: {step.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
