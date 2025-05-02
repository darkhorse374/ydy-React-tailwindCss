
import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ProfileFormProps {
  tagline: string;
  setTagline: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  isLGBTQ: boolean;
  setIsLGBTQ: (value: boolean) => void;
  occupation: string;
  setOccupation: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  seekingSupport: boolean;
  setSeekingSupport: (value: boolean) => void;
  givingSupport: boolean;
  setGivingSupport: (value: boolean) => void;
  handleBack: () => void;
  handleSkip: () => void;
  handleFinish: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  tagline, setTagline,
  bio, setBio,
  age, setAge,
  gender, setGender,
  isLGBTQ, setIsLGBTQ,
  occupation, setOccupation,
  phone, setPhone,
  seekingSupport, setSeekingSupport,
  givingSupport, setGivingSupport,
  handleBack,
  handleSkip,
  handleFinish
}) => {
  return (
    <div className="py-12 px-8 md:px-12 max-w-lg w-full mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
      {/* Back button */}
      <button 
        onClick={handleBack}
        className="flex items-center text-indigo-500 mb-4 hover:text-indigo-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back</span>
      </button>
      
      <h1 className="text-4xl font-bold mb-2 text-gray-900">ENHANCE YOUR PROFILE</h1>
      <p className="text-gray-700 mb-6">
        Building your profile helps us better match you with communities and people with likeness.
        <span className="text-gray-500 ml-1">(Optional)</span>
      </p>
      
      <div className="space-y-5">
        {/* Tagline */}
        <div>
          <Input 
            id="tagline" 
            placeholder="Tagline" 
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="py-5"
          />
        </div>
        
        {/* Bio */}
        <div>
          <Textarea 
            id="bio" 
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
        
        {/* Age */}
        <div>
          <Input 
            id="age" 
            placeholder="Age" 
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="py-5"
          />
        </div>
        
        {/* Gender */}
        <div>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="py-5">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* LGBTQ+ */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="lgbtq" 
            checked={isLGBTQ}
            onCheckedChange={(checked) => setIsLGBTQ(checked as boolean)}
          />
          <label
            htmlFor="lgbtq"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            LGBTQ+
          </label>
        </div>
        
        {/* Occupation */}
        <div>
          <Input 
            id="occupation" 
            placeholder="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="py-5"
          />
        </div>
        
        {/* Phone */}
        <div>
          <div className="flex items-center">
            <Input 
              id="phone" 
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="py-5"
            />
            <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">(For SMS Notifications)</span>
          </div>
        </div>
        
        {/* Seeking Support */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="seeking-support" 
            checked={seekingSupport}
            onCheckedChange={(checked) => setSeekingSupport(checked as boolean)}
          />
          <label
            htmlFor="seeking-support"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Seeking Support
          </label>
        </div>
        
        {/* Giving Support */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="giving-support" 
            checked={givingSupport}
            onCheckedChange={(checked) => setGivingSupport(checked as boolean)}
          />
          <label
            htmlFor="giving-support"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Giving Support
          </label>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button 
            className="text-indigo-500 hover:text-indigo-600 font-medium"
            onClick={handleSkip}
          >
            Skip
          </button>
          <Button 
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8"
            onClick={handleFinish}
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
