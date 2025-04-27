
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const DemographicsTab = () => {
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLGBTQ, setIsLGBTQ] = useState(false);
  const [race, setRace] = useState("");
  const [language, setLanguage] = useState("");
  const [school, setSchool] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleSave = () => {
    toast({
      title: "Demographics updated",
      description: "Your demographic information has been saved successfully."
    });
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold mb-6">Demographics Settings</h3>
      <p className="text-gray-500 mb-6">
        This information helps us connect you with the right communities. All fields are optional.
      </p>
      
      <div className="space-y-4 max-w-md">
        {/* Location */}
        <div>
          <Input 
            placeholder="Location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        {/* Age */}
        <div>
          <Select value={age} onValueChange={setAge}>
            <SelectTrigger>
              <SelectValue placeholder="Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="18-24">18-24</SelectItem>
              <SelectItem value="25-34">25-34</SelectItem>
              <SelectItem value="35-44">35-44</SelectItem>
              <SelectItem value="45-54">45-54</SelectItem>
              <SelectItem value="55-64">55-64</SelectItem>
              <SelectItem value="65+">65+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Gender */}
        <div>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="other">Other</SelectItem>
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
        
        {/* Race */}
        <div>
          <Select value={race} onValueChange={setRace}>
            <SelectTrigger>
              <SelectValue placeholder="Race" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="black">Black or African American</SelectItem>
              <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
              <SelectItem value="native">Native American or Alaska Native</SelectItem>
              <SelectItem value="pacific">Pacific Islander</SelectItem>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="multiracial">Multiracial</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Language */}
        <div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="korean">Korean</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="russian">Russian</SelectItem>
              <SelectItem value="portuguese">Portuguese</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* School */}
        <div>
          <Input 
            placeholder="School" 
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        
        {/* Occupation */}
        <div>
          <Input 
            placeholder="Occupation" 
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>
        
        {/* Save Button */}
        <div className="pt-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemographicsTab;
