
import React, { useState } from "react";
import { Megaphone, Bell, User, Menu, BellDot } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import FeedbackModal from "./FeedbackModal";
import { Toaster } from "@/components/ui/toaster";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationsList from "./notifications/NotificationsList";

interface NavbarProps {
  onOpenSidebar: () => void;
}

const Navbar = ({ onOpenSidebar }: NavbarProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Sarah accepted your connection request",
      time: "Just now",
      read: false,
      link: "/user-profile/1"
    },
    {
      id: 2,
      message: "New message in Anxiety Support community",
      time: "10 minutes ago",
      read: false,
      link: "/communities/1"
    },
    {
      id: 3,
      message: "Your post received 5 new comments",
      time: "1 hour ago",
      read: false,
      link: "/message-board/posts/1"
    },
    {
      id: 4,
      message: "New resource added: Mindfulness Techniques",
      time: "3 hours ago",
      read: false,
      link: "/resources"
    },
    {
      id: 5,
      message: "Monthly wellness report is available",
      time: "1 day ago",
      read: true,
      link: "/dashboard"
    }
  ]);

  const handleNotificationsOpen = () => {
    if (hasUnreadNotifications) {
      setHasUnreadNotifications(false);
      
      // Mark all notifications as read
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
    }
  };

  // Check if current route is part of the initial sign-up flow
  const isInitialFlow = location.pathname === "/" || 
                      location.pathname === "/about" || 
                      location.pathname === "/signup" || 
                      location.pathname === "/login" || 
                      location.pathname === "/assess" || 
                      location.pathname === "/profile";

  return (
    <>
      <header className="bg-white border-b border-gray-200 py-3 px-6 flex justify-between items-center h-16 w-full fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={onOpenSidebar}>
              <Menu className="h-5 w-5 text-[#6699FF]" />
            </Button>
          )}
          <Link to="/dashboard" className="flex items-center">
            {/* Show logo on mobile only if we're in the initial flow */}
            {(!isMobile || isInitialFlow) && <Logo />}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setFeedbackOpen(true)}
          >
            <Megaphone className="w-5 h-5 text-[#6699FF]" />
          </Button>
          
          <DropdownMenu onOpenChange={handleNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-gray-100 transition-colors relative"
              >
                {hasUnreadNotifications ? (
                  <BellDot className="w-5 w-5 text-[#6699FF]" />
                ) : (
                  <Bell className="w-5 h-5 text-[#6699FF]" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <NotificationsList notifications={notifications} />
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-gray-100 transition-colors"
              >
                <User className="w-5 h-5 text-[#6699FF]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/account" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4 text-[#6699FF]" />
                  <span>My Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      <Toaster />
    </>
  );
};

export default Navbar;
