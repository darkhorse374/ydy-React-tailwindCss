
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/Logo";

// This is the access code that will protect the app
// In a real app, this would be stored securely, not hardcoded
const ACCESS_CODE = "You Do You";

interface CodeProtectionProps {
  children: React.ReactNode;
}

const CodeProtection = ({ children }: CodeProtectionProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already entered the correct code
    // Use a different storage key to force re-authentication
    const hasAccess = localStorage.getItem("app-access-v3") === "granted";
    setIsAuthenticated(hasAccess);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a small delay to make it feel like verification
    setTimeout(() => {
      // Use exact matching to check the access code
      if (code.trim() === ACCESS_CODE) {
        localStorage.setItem("app-access-v3", "granted");
        setIsAuthenticated(true);
        toast({
          title: "Access granted",
          description: "Welcome to the application",
        });
      } else {
        toast({
          title: "Access denied",
          description: "The code you entered is incorrect",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* Background image - standard for all pages */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("/images/dashboard-bg.png")',
          height: '100vh'
        }}
      />
      
      <div className="w-full max-w-md space-y-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 relative z-10">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Private Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the access code to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              id="access-code"
              name="code"
              type="text"
              autoComplete="off"
              required
              className="py-6"
              placeholder="Enter access code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-6"
            variant="blue-custom"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CodeProtection;
