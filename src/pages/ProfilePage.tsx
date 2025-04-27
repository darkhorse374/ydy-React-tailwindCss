
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProfileBackground from "@/components/profile/ProfileBackground";
import ProfileForm from "@/components/profile/ProfileForm";
import StepIndicator from "@/components/StepIndicator";
import { useIsMobile } from "@/hooks/use-mobile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLGBTQ, setIsLGBTQ] = useState(false);
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [seekingSupport, setSeekingSupport] = useState(false);
  const [givingSupport, setGivingSupport] = useState(false);

  const handleBack = () => {
    navigate("/assess");
  };

  const handleSkip = () => {
    toast.success("Welcome to the community!");
    navigate("/dashboard");
  };

  const handleFinish = () => {
    toast.success("Profile created successfully!");
    navigate("/dashboard");
  };

  return (
    <ProfileBackground>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl px-4 md:px-8">
        {/* Step Indicator - hidden on mobile */}
        <div className={`${isMobile ? 'hidden' : 'block'} min-w-[200px]`}>
          <StepIndicator currentStep={4} />
        </div>
        
        <ProfileForm 
          tagline={tagline}
          setTagline={setTagline}
          bio={bio}
          setBio={setBio}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          isLGBTQ={isLGBTQ}
          setIsLGBTQ={setIsLGBTQ}
          occupation={occupation}
          setOccupation={setOccupation}
          phone={phone}
          setPhone={setPhone}
          seekingSupport={seekingSupport}
          setSeekingSupport={setSeekingSupport}
          givingSupport={givingSupport}
          setGivingSupport={setGivingSupport}
          handleBack={handleBack}
          handleSkip={handleSkip}
          handleFinish={handleFinish}
        />
      </div>
    </ProfileBackground>
  );
};

export default ProfilePage;
