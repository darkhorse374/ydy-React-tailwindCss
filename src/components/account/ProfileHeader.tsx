
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, UserRound } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ProfileHeaderProps {
  handleProfileImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBannerImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  handleProfileImageUpload,
  handleBannerImageUpload,
}) => {
  return (
    <>
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-[#6699FF] to-indigo-500">
          {/* Removed the img tag to show the gradient instead */}
        </div>
        <label
          htmlFor="banner-upload"
          className="absolute right-4 bottom-4 bg-black/70 text-white px-3 py-2 rounded-md flex items-center cursor-pointer hover:bg-black/80 transition"
        >
          <Camera className="mr-2 h-4 w-4" />
          Change Banner
          <input
            type="file"
            id="banner-upload"
            accept="image/*"
            className="hidden"
            onChange={handleBannerImageUpload}
          />
        </label>
      </div>

      <div className="px-6 pb-6">
        <div className="relative -mt-12 inline-block">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="Profile" />
            <AvatarFallback className="text-2xl bg-blue-100 text-[#6699FF] flex items-center justify-center">
              <UserRound className="h-12 w-12 text-[#6699FF]" />
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-black/70 text-white p-2 rounded-full cursor-pointer hover:bg-black/80 transition"
          >
            <Camera className="h-4 w-4" />
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageUpload}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
