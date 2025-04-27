
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

const LoginPage = () => {
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
      
      <div className="flex flex-1 flex-col md:flex-row relative z-10">
        {/* Left side with logo */}
        <div className={`${isMobile ? 'p-8' : 'p-16'} ${isMobile ? 'w-full' : 'md:w-1/3'} flex flex-col`}>
          <div className={`${isMobile ? 'mb-8' : 'mb-20'}`}>
            <Logo />
          </div>
        </div>
        
        {/* Right content area - Full width on mobile */}
        <div className="w-full md:w-2/3 flex items-center justify-center">  
          {/* Content card */}
          <div className="relative z-10 p-8 md:p-16 max-w-xl bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">LOGIN</h1>
            <p className="text-gray-700 mb-4">
              Welcome back! Enter your details to continue your journey.
            </p>
            
            <div className="space-y-4">
              {/* Google Login Button */}
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 py-5"
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google logo" 
                  className="w-5 h-5" 
                />
                Login with Google
              </Button>
              
              {/* Input fields */}
              <div className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="py-5"
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="py-5"
                />
              </div>
              
              {/* Login button */}
              <Button 
                className="w-full bg-[#6699FF] hover:bg-[#5580DD] text-white py-6 rounded-md text-base"
              >
                Login
              </Button>
              
              {/* Sign up link */}
              <div className="text-center mt-4">
                <p className="text-sm">
                  Don't have an account? 
                  <Link to="/signup" className="text-[#6699FF] hover:text-[#5580DD] ml-1">
                    Sign Up Here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
