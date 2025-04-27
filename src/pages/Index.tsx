
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CodeProtection from "@/components/auth/CodeProtection";

const Index = () => {
  const navigate = useNavigate();

  return (
    <CodeProtection>
      <div className="min-h-screen flex items-center justify-center">
        {/* Background image - standard for all pages */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat z-0"
          style={{ 
            backgroundImage: 'url("/images/dashboard-bg.png")',
            height: '100vh'
          }}
        />
        
        <div className="text-center max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg relative z-10">
          <h1 className="text-4xl font-bold mb-6">YOU DO YOU</h1>
          <p className="mb-8 text-gray-600">
            Join our mental health community to find support and connection.
          </p>
          <Button 
            onClick={() => navigate("/about")}
            className="bg-[#6699FF] hover:bg-[#5580DD]"
          >
            Get Started
          </Button>
        </div>
      </div>
    </CodeProtection>
  );
};

export default Index;
