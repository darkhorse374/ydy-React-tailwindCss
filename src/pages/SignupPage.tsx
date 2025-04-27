
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileBackground from "@/components/profile/ProfileBackground";

const SignupPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showEmail, setShowEmail] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate and submit the form data
    // Here we just navigate to the next page
    navigate("/assess");
  };

  const handleGoogleSignUp = () => {
    // In a real app, this would trigger Google OAuth
    setShowEmail(false);
    // For demo purposes, we'll just simulate and navigate after a short delay
    setTimeout(() => {
      navigate("/assess");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("/images/dashboard-bg.png")',
          height: '100vh'
        }}
      />
      
      {/* Top navbar with logo */}
      <div className="absolute top-0 left-0 z-20 w-full p-4 md:p-6">
        <div className="container mx-auto">
          <Logo />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center pt-20">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl px-4 md:px-8">
          {/* Step Indicator - hidden on mobile */}
          <div className={`${isMobile ? 'hidden' : 'block'} min-w-[200px]`}>
            <StepIndicator currentStep={2} />
          </div>
          
          {/* Content card - Form container */}
          <div className="relative z-10 py-8 px-8 md:py-16 md:px-12 max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">SIGN UP</h1>
            <p className="text-gray-700 mb-6">
              No matter where you are on your journey, you belong here.
              <br />
              Sign up today and start connecting.
            </p>
            
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Google Sign Up Button */}
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 py-5"
                onClick={handleGoogleSignUp}
                type="button"
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google logo" 
                  className="w-5 h-5" 
                />
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              {/* Input fields */}
              {showEmail && (
                <div className="space-y-4">
                  <Input 
                    type="text" 
                    placeholder="Name" 
                    className="py-5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    className="py-5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              
              {/* Sign up button */}
              <Button 
                type="submit"
                className="w-full bg-indigo-400 hover:bg-indigo-500 text-white py-6 rounded-md text-base"
              >
                Sign Up
              </Button>
              
              {/* Login link */}
              <div className="text-center">
                <p className="text-sm">
                  Already have an account? 
                  <Link to="/login" className="text-indigo-500 hover:text-indigo-700 ml-1">
                    Login Here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
