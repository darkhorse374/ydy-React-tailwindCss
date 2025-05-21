
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Connection } from "@/types/sidebar";
import { getInitials } from "@/utils/stringUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConnectionsSectionProps {
  connections: Connection[];
  onLinkClick?: () => void;
}

const ConnectionsSection = ({ connections, onLinkClick }: ConnectionsSectionProps) => {
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
        <h2 className="text-sm font-bold uppercase text-[#6698FF]">Connections</h2>
        <ChevronRight className="w-4 h-4 text-[#6698FF]" />
      </div>
      <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
        {connections.map((connection) => {
          // Randomly decide if this connection should have an actual profile picture
          // Using a deterministic approach based on connection ID to ensure consistency between renders
          const hasProfilePic = connection.id % 3 === 0; // Roughly 1/3 of connections will have profile pics
          const imageIndex = connection.id % profileImages.length;
          
          return (
            <li key={connection.id} className="flex items-center space-x-3 px-2">
              <Avatar className="h-6 w-6">
                {hasProfilePic ? (
                  <AvatarImage src={profileImages[imageIndex]} alt={connection.name} />
                ) : null}
                <AvatarFallback 
                  className={`text-xs ${
                    connection.id % 5 === 0 ? "bg-green-100 text-green-800" : 
                    connection.id % 5 === 1 ? "bg-blue-100 text-blue-800" : 
                    connection.id % 5 === 2 ? "bg-orange-100 text-orange-800" :
                    connection.id % 5 === 3 ? "bg-purple-100 text-purple-800" :
                    "bg-pink-100 text-pink-800"
                  }`}
                >
                  {getInitials(connection.name)}
                </AvatarFallback>
              </Avatar>
              <Link to={`/user-profile/${connection.id}`} onClick={handleClick}>
                <span>{connection.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConnectionsSection;
