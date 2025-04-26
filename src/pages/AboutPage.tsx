
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const AboutPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
      
      {/* Logo in top left corner */}
      <div className="relative z-10 p-8">
        <Logo />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-3xl flex flex-col items-center justify-center px-8">
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            {/* Step Indicator - hidden on mobile, positioned left of form */}
            <div className={`${isMobile ? 'hidden' : 'block'} min-w-[200px]`}>
              <StepIndicator currentStep={1} />
            </div>
            
            {/* Content card */}
            <div className="relative z-10 p-8 md:p-16 max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <h1 className="text-5xl font-bold mb-6 text-gray-900 text-center">YOU DO YOU</h1>
              <p className="text-gray-700 mb-8 text-lg">
                Hi there, and welcome! Want to find a community and meet people going through what you are? 
                It's pretty easy, just fill out your profile and we match you with interesting communities 
                and people to get to know, plus a bunch of other cool stuff. Enjoy!
              </p>
              
              <Button 
                onClick={() => navigate("/signup")}
                className="w-full bg-indigo-400 hover:bg-indigo-500 text-white py-6 rounded-md text-xl"
              >
                SIGN UP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
