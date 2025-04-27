
import React from "react";
import { Button } from "@/components/ui/button";
import { Lock, User, FileText, Users, Share2, Bell } from "lucide-react";

interface AccountSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="space-y-4">
      <Button
        variant={activeTab === "account" ? "blue-custom" : "ghost"}
        className="w-full justify-start"
        onClick={() => setActiveTab("account")}
      >
        <Lock className="mr-2 h-5 w-5" />
        Account
      </Button>
      <Button
        variant={activeTab === "profile" ? "blue-custom" : "ghost"}
        className="w-full justify-start"
        onClick={() => setActiveTab("profile")}
      >
        <User className="mr-2 h-5 w-5" />
        Profile
      </Button>
      <Button
        variant={activeTab === "assess" ? "blue-custom" : "ghost"}
        className="w-full justify-start"
        onClick={() => setActiveTab("assess")}
      >
        <FileText className="mr-2 h-5 w-5" />
        Assess
      </Button>
      <Button
        variant={activeTab === "demographics" ? "blue-custom" : "ghost"}
        className="w-full justify-start"
        onClick={() => setActiveTab("demographics")}
      >
        <Users className="mr-2 h-5 w-5" />
        Demographics
      </Button>
      <Button
        variant={activeTab === "socials" ? "blue-custom" : "ghost"}
        className="w-full justify-start"
        onClick={() => setActiveTab("socials")}
      >
        <Share2 className="mr-2 h-5 w-5" />
        Socials
      </Button>
      <Button
        variant={activeTab === "notifications" ? "blue-custom" : "ghost"}
        className="w-full justify-start"
        onClick={() => setActiveTab("notifications")}
      >
        <Bell className="mr-2 h-5 w-5" />
        Notification Settings
      </Button>
    </div>
  );
};

export default AccountSidebar;
