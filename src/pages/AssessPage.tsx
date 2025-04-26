
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Angry, Frown, Meh, Smile, SmilePlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileBackground from "@/components/profile/ProfileBackground";
import StepIndicator from "@/components/StepIndicator";

const AssessPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [struggles, setStruggles] = useState("");
  const [interests, setInterests] = useState("");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  // Define mood options with icons and descriptions
  const moodOptions = [
    { value: 1, icon: <Angry className="h-8 w-8" />, label: "Depressed" },
    { value: 2, icon: <Frown className="h-8 w-8" />, label: "Down" },
    { value: 3, icon: <Meh className="h-8 w-8" />, label: "OK" },
    { value: 4, icon: <Smile className="h-8 w-8" />, label: "Good" },
    { value: 5, icon: <SmilePlus className="h-8 w-8" />, label: "Great" },
  ];

  const handleSubmit = () => {
    // In a real application, this would save the assessment data
    // Here we just navigate to the next step
    navigate("/profile");
  };

  return (
    <ProfileBackground>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl px-4 md:px-8">
        {/* Step Indicator - hidden on mobile */}
        <div className={`${isMobile ? 'hidden' : 'block'} min-w-[200px]`}>
          <StepIndicator currentStep={3} />
        </div>
        
        {/* Main content */}
        <div className="relative z-10 py-8 px-8 md:py-16 md:px-12 max-w-lg w-full mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">LET'S GET TO KNOW YOU</h1>
          <p className="text-gray-700 mb-6">
            Help us understand more about you so we can connect you with the right resources.
          </p>
          
          <div className="space-y-6">
            {/* Struggles question */}
            <div className="space-y-2">
              <label htmlFor="struggles" className="block text-gray-700 font-medium">
                What do you or have you struggled with?
              </label>
              <Textarea 
                id="struggles"
                value={struggles}
                onChange={(e) => setStruggles(e.target.value)}
                className="min-h-[100px] w-full py-3 px-4"
                placeholder="Share your experiences..."
              />
            </div>

            {/* Interests question */}
            <div className="space-y-2">
              <label htmlFor="interests" className="block text-gray-700 font-medium">
                What interests do you or used to enjoy?
              </label>
              <Textarea 
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="min-h-[100px] w-full py-3 px-4"
                placeholder="Tell us about your interests..."
              />
            </div>

            {/* Mood selection */}
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                What kind of mood are you in?
              </label>
              <div className="flex justify-between mx-auto w-full">
                {moodOptions.map((mood) => (
                  <div 
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center cursor-pointer transition-all p-1 md:p-2 ${
                      selectedMood === mood.value 
                        ? "bg-indigo-100 text-indigo-600 scale-110" 
                        : "hover:bg-gray-100"
                    } rounded-full`}
                  >
                    <div className={`p-1 md:p-2 rounded-full ${
                      selectedMood === mood.value ? "text-indigo-500" : "text-gray-500"
                    }`}>
                      {mood.icon}
                    </div>
                    <span className="text-xs mt-1">{mood.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Next button */}
            <Button 
              className="w-full bg-indigo-400 hover:bg-indigo-500 text-white py-6 rounded-md text-base mt-6"
              onClick={handleSubmit}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </ProfileBackground>
  );
};

export default AssessPage;
