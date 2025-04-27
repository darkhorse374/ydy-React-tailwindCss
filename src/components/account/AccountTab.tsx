
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const AccountTab = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="mt-8 max-w-md">
      <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
      
      <div className="mb-8">
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex items-center">
            <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" className="w-5 h-5 mr-2" />
            <p className="text-sm text-gray-700">Signed in as Graham</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">g.raham@youdoyou.org</p>
        </div>
        
        <Button variant="outline" className="w-full">
          Unlink Google Account
        </Button>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <h4 className="text-lg font-semibold mb-4">Change Password</h4>
        <form onSubmit={handlePasswordChange}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="old-password">Old password</Label>
              <Input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">Update Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountTab;
