
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, MessageSquare, MessagesSquare, FileText, Bot, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

interface NavigationLinksProps {
  onLinkClick?: () => void;
}

const NavigationLinks = ({ onLinkClick }: NavigationLinksProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const [notifications, setNotifications] = useState({
    messageBoard: 3,
    resources: 7
  });

  // Clear notification when user navigates to that page
  useEffect(() => {
    if (location.pathname === '/message-board' && notifications.messageBoard) {
      setNotifications(prev => ({ ...prev, messageBoard: 0 }));
    } else if (location.pathname === '/resources' && notifications.resources) {
      setNotifications(prev => ({ ...prev, resources: 0 }));
    }
  }, [location.pathname, notifications]);
  
  const handleClick = () => {
    // If we're on mobile and have a click handler, call it
    if (isMobile && onLinkClick) {
      onLinkClick();
    }
  };
  
  return (
    <div className="space-y-2 mb-6">
      <Link to="/people" onClick={handleClick}>
        <div className={`flex items-center justify-between py-2 px-3 rounded-md ${
          location.pathname === '/people' ? 'bg-purple-100' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-[#6698FF]" />
            <h2 className="text-sm font-medium text-gray-700">People</h2>
          </div>
        </div>
      </Link>
      
      <Link to="/chat" onClick={handleClick}>
        <div className={`flex items-center justify-between py-2 px-3 rounded-md ${
          location.pathname === '/chat' ? 'bg-purple-100' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-[#6698FF]" />
            <h2 className="text-sm font-medium text-gray-700">Chat</h2>
          </div>
        </div>
      </Link>

      <Link to="/message-board" onClick={handleClick}>
        <div className={`flex items-center justify-between py-2 px-3 rounded-md ${
          location.pathname === '/message-board' ? 'bg-purple-100' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2">
            <MessagesSquare className="w-4 h-4 text-[#6698FF]" />
            <h2 className="text-sm font-medium text-gray-700">Message Board</h2>
          </div>
          {notifications.messageBoard > 0 && (
            <Badge variant="outline" className="bg-[#6698FF] border-[#6698FF] text-white text-[10px] h-5 min-w-5 flex items-center justify-center rounded-full px-1.5">
              {notifications.messageBoard}
            </Badge>
          )}
        </div>
      </Link>
      
      <Link to="/video-meetings" onClick={handleClick}>
        <div className={`flex items-center justify-between py-2 px-3 rounded-md ${
          location.pathname === '/video-meetings' ? 'bg-purple-100' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4 text-[#6698FF]" />
            <h2 className="text-sm font-medium text-gray-700">Video Meetings</h2>
          </div>
        </div>
      </Link>
      
      <Link to="/resources" onClick={handleClick}>
        <div className={`flex items-center justify-between py-2 px-3 rounded-md ${
          location.pathname === '/resources' ? 'bg-purple-100' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#6698FF]" />
            <h2 className="text-sm font-medium text-gray-700">Resources</h2>
          </div>
          {notifications.resources > 0 && (
            <Badge variant="outline" className="bg-[#6698FF] border-[#6698FF] text-white text-[10px] h-5 min-w-5 flex items-center justify-center rounded-full px-1.5">
              {notifications.resources}
            </Badge>
          )}
        </div>
      </Link>
      
      {/* Add separator line below Resources */}
      <Separator className="my-4" />
    </div>
  );
};

export default NavigationLinks;
