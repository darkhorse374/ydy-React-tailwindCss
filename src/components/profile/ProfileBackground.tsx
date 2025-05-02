
import React, { ReactNode } from "react";
import Logo from "@/components/Logo";

interface ProfileBackgroundProps {
  children: ReactNode;
}

const ProfileBackground: React.FC<ProfileBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background image - standard for all pages */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("/images/dashboard-bg.png")',
          height: '100vh'
        }}
      />
      
      {/* Logo section */}
      <div className="p-8 md:p-16 relative z-10">
        <Logo />
      </div>
      
      {/* Content area */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ProfileBackground;
