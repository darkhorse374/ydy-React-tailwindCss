
import React from "react";
import { Bot, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RaePage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/rae-chat");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-8 gap-3">
        <Bot className="h-8 w-8 text-[#6699FF]" />
        <div>
          <div className="flex items-baseline gap-2 flex-wrap md:flex-nowrap">
            <h1 className="text-3xl font-bold">Rae</h1>
            {isMobile ? (
              <p className="text-gray-600 w-full">Your AI Therapist</p>
            ) : (
              <span className="text-3xl font-bold text-gray-600">- Your AI Therapist</span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <Bot className="h-16 w-16 text-[#6699FF] mb-4" />
          <h2 className="text-xl font-semibold mb-2">Rae is here to help</h2>
          <p className="text-gray-600 text-center max-w-md mb-8">
            Your AI Therapist that can answer questions, provide mental health resources, 
            and offer support whenever you need it.
          </p>
          <div className="border border-gray-200 p-8 rounded-lg w-full max-w-2xl shadow-sm flex flex-col items-center">
            <Button 
              onClick={handleGetStarted} 
              variant="blue-custom" 
              className="px-6"
            >
              Get Started! <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaePage;
