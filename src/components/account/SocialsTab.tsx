
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Globe, Facebook, Instagram, Twitter, Youtube, Copy, CheckCircle } from "lucide-react";
import TikTokIcon from "@/components/icons/TikTokIcon";

const SocialsTab = () => {
  const [socialLinks, setSocialLinks] = useState({
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    snapchat: "",
    youtube: ""
  });
  const [copied, setCopied] = useState(false);
  const profileUrl = "https://youdoyou.org/profiles/grahem";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Social links saved:", socialLinks);
    toast({
      title: "Social links updated",
      description: "Your social media links have been saved successfully.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "Profile URL has been copied to clipboard.",
        });
        
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard. Please try again.",
          variant: "destructive"
        });
      });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">Social Media Settings</h3>
      
      <div className="space-y-6">
        {/* Profile URL (non-editable) */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3H9C7.89543 3 7 3.89543 7 5V19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V5C17 3.89543 16.1046 3 15 3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 18H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 font-medium mr-2">{profileUrl}</p>
            <button 
              onClick={copyToClipboard}
              className="text-gray-500 hover:text-gray-800 transition-colors focus:outline-none"
              aria-label="Copy profile URL to clipboard"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <Input
            name="website"
            placeholder="Website"
            value={socialLinks.website}
            onChange={handleInputChange}
            className="max-w-md"
          />
        </div>

        {/* Facebook */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <Facebook className="w-6 h-6" />
          </div>
          <Input
            name="facebook"
            placeholder="Facebook"
            value={socialLinks.facebook}
            onChange={handleInputChange}
            className="max-w-md"
          />
        </div>

        {/* Instagram */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <Instagram className="w-6 h-6" />
          </div>
          <Input
            name="instagram"
            placeholder="Instagram"
            value={socialLinks.instagram}
            onChange={handleInputChange}
            className="max-w-md"
          />
        </div>

        {/* Twitter/X */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <Twitter className="w-6 h-6" />
          </div>
          <Input
            name="twitter"
            placeholder="X"
            value={socialLinks.twitter}
            onChange={handleInputChange}
            className="max-w-md"
          />
        </div>

        {/* TikTok */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <TikTokIcon className="w-6 h-6" />
          </div>
          <Input
            name="tiktok"
            placeholder="TikTok"
            value={socialLinks.tiktok}
            onChange={handleInputChange}
            className="max-w-md"
          />
        </div>

        {/* Snapchat */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C9.8 2 8.2 3.6 8.2 5.8C8.2 5.8 8.19 6.5 8 7C7.8 7.5 7 8 6 8C5 8 4 7.5 4 7.5L4 9C4 9 5 9.5 5 10.75C5 12 4 12 4 12C4 12 4.5 14.5 9 16C9.5 16.5 10 18 10 18L13 17L16 18C16 18 16.5 16.5 17 16C21.5 14.5 22 12 22 12C22 12 21 12 21 10.75C21 9.5 22 9 22 9L22 7.5C22 7.5 21 8 20 8C19 8 18.2 7.5 18 7C17.81 6.5 17.8 5.8 17.8 5.8C17.8 3.6 16.2 2 14 2H12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <Input
            name="snapchat"
            placeholder="Snapchat"
            value={socialLinks.snapchat}
            onChange={handleInputChange}
            className="max-w-md"
          />
        </div>

        {/* YouTube */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <Youtube className="w-6 h-6" />
          </div>
          <Input
            name="youtube"
            placeholder="YouTube"
            value={socialLinks.youtube}
            onChange={handleInputChange}
            className="max-w-md"
          />
        </div>

        {/* Save Button */}
        <div className="pt-6">
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

export default SocialsTab;
