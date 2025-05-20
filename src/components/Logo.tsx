
import React from "react";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const Logo = ({ className = "", size = "medium" }: LogoProps) => {
  // Determine the size class based on the size prop
  const sizeClass = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  }[size];

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/112379c2-b5a5-442e-ab63-7ede0f48a26a.png" 
        alt="Logo" 
        className={`${sizeClass} object-contain`}
      />
    </div>
  );
};

export default Logo;
