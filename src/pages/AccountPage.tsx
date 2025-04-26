
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import ProfileHeader from "@/components/account/ProfileHeader";
import AccountSidebar from "@/components/account/AccountSidebar";
import AccountTab from "@/components/account/AccountTab";
import ProfileTab from "@/components/account/ProfileTab";
import AssessTab from "@/components/account/AssessTab";
import DemographicsTab from "@/components/account/DemographicsTab";
import SocialsTab from "@/components/account/SocialsTab";
import NotificationsTab from "@/components/account/NotificationsTab";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("assess");

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      });
    }
  };

  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "Banner updated",
        description: "Your profile banner has been updated successfully.",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="col-span-1 md:col-span-3">
          <Card>
            <CardContent className="p-0">
              <ProfileHeader 
                handleProfileImageUpload={handleProfileImageUpload}
                handleBannerImageUpload={handleBannerImageUpload}
              />

              <div className="px-6 pb-6">
                {activeTab === "account" && <AccountTab />}
                {activeTab === "profile" && <ProfileTab />}
                {activeTab === "assess" && <AssessTab />}
                {activeTab === "demographics" && <DemographicsTab />}
                {activeTab === "socials" && <SocialsTab />}
                {activeTab === "notifications" && <NotificationsTab />}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
