
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

const NotificationsTab = () => {
  const [phone, setPhone] = useState("");
  const [emailPreferences, setEmailPreferences] = useState({
    newsletter: true,
    communityHighlights: true,
  });
  const [smsPreferences, setSmsPreferences] = useState({
    newConnectionRequest: true,
    newDirectMessage: true,
    messageBoardReplies: true,
    communityBoardPosts: true,
    someonJoinCommunity: true,
    journalReminders: true,
  });

  const handleEmailPreferenceChange = (
    preference: keyof typeof emailPreferences
  ) => {
    setEmailPreferences({
      ...emailPreferences,
      [preference]: !emailPreferences[preference],
    });
  };

  const handleSmsPreferenceChange = (preference: keyof typeof smsPreferences) => {
    setSmsPreferences({
      ...smsPreferences,
      [preference]: !smsPreferences[preference],
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Email preferences:", emailPreferences);
    console.log("SMS preferences:", smsPreferences);
    console.log("Phone:", phone);
    
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved successfully.",
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
      
      <div className="space-y-8">
        {/* Email Preferences */}
        <div>
          <h4 className="text-lg font-medium mb-4">Email Preferences</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newsletter" 
                checked={emailPreferences.newsletter}
                onCheckedChange={() => handleEmailPreferenceChange("newsletter")}
              />
              <label
                htmlFor="newsletter"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Newsletter
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="communityHighlights" 
                checked={emailPreferences.communityHighlights}
                onCheckedChange={() => handleEmailPreferenceChange("communityHighlights")}
              />
              <label
                htmlFor="communityHighlights"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Community Highlights
              </label>
            </div>
          </div>
        </div>
        
        {/* SMS Preferences */}
        <div>
          <h4 className="text-lg font-medium mb-4">SMS Preferences</h4>
          <div className="mb-4">
            <Input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={handlePhoneChange}
              className="max-w-md"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newConnectionRequest" 
                checked={smsPreferences.newConnectionRequest}
                onCheckedChange={() => handleSmsPreferenceChange("newConnectionRequest")}
              />
              <label
                htmlFor="newConnectionRequest"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                New connection request
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newDirectMessage" 
                checked={smsPreferences.newDirectMessage}
                onCheckedChange={() => handleSmsPreferenceChange("newDirectMessage")}
              />
              <label
                htmlFor="newDirectMessage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                New Direct Message
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="messageBoardReplies" 
                checked={smsPreferences.messageBoardReplies}
                onCheckedChange={() => handleSmsPreferenceChange("messageBoardReplies")}
              />
              <label
                htmlFor="messageBoardReplies"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Replies to message board posts
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="communityBoardPosts" 
                checked={smsPreferences.communityBoardPosts}
                onCheckedChange={() => handleSmsPreferenceChange("communityBoardPosts")}
              />
              <label
                htmlFor="communityBoardPosts"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Community board posts
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="someonJoinCommunity" 
                checked={smsPreferences.someonJoinCommunity}
                onCheckedChange={() => handleSmsPreferenceChange("someonJoinCommunity")}
              />
              <label
                htmlFor="someonJoinCommunity"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Someone join my community
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="journalReminders" 
                checked={smsPreferences.journalReminders}
                onCheckedChange={() => handleSmsPreferenceChange("journalReminders")}
              />
              <label
                htmlFor="journalReminders"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Journal reminders
              </label>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="pt-4">
          <Button 
            variant="purple" 
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
