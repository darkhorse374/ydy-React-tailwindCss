
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DirectMessage } from "@/types/sidebar";
import { getInitials } from "@/utils/stringUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DirectMessagesSectionProps {
  directMessages: DirectMessage[];
  onLinkClick?: () => void;
}

const DirectMessagesSection = ({ directMessages, onLinkClick }: DirectMessagesSectionProps) => {
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    // If we're on mobile and have a click handler, call it
    if (isMobile && onLinkClick) {
      onLinkClick();
    }
  };
  
  // Profile image URLs - a small set of diverse profile pictures
  const profileImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
  ];
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 px-2">
        <h2 className="text-sm font-bold uppercase text-[#6698FF]">Direct Messages</h2>
        <ChevronRight className="w-4 h-4 text-[#6698FF]" />
      </div>
      <ul className="space-y-2">
        {directMessages.map((message) => {
          // Randomly decide if this message has a profile picture
          // Using a deterministic approach based on ID for consistency
          const hasProfilePic = message.id % 2 === 0; // Every other message has a profile pic
          const imageIndex = message.id % profileImages.length;
          
          return (
            <li key={message.id}>
              <Link to={`/direct-message/${message.id}`} onClick={handleClick}>
                <div className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      {hasProfilePic ? (
                        <AvatarImage src={profileImages[imageIndex]} alt={message.name} />
                      ) : null}
                      <AvatarFallback className={message.isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {getInitials(message.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{message.name}</span>
                      {message.isOnline && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                  </div>
                  {message.unreadCount > 0 && (
                    <span className="bg-[#6698FF] text-white text-xs px-1.5 py-0.5 rounded-full">
                      {message.unreadCount}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DirectMessagesSection;
