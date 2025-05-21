
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Book, Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface JournalLinkProps {
  onLinkClick?: () => void;
}

const JournalLink = ({ onLinkClick }: JournalLinkProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent, path: string) => {
    // If we're on mobile and have a click handler, call it
    if (isMobile && onLinkClick) {
      onLinkClick();
    }
    
    // If the current location has state, we need to preserve it
    if (location.state && path === '/journal') {
      e.preventDefault();
      navigate(path, { state: location.state });
      console.log("JournalLink: Navigating with state:", location.state);
    }
  };
  
  return (
    <div className="mb-6">
      {/* Journal Link - Now first */}
      <Link 
        to="/journal" 
        onClick={(e) => handleClick(e, '/journal')}
      >
        <div className={`flex items-center space-x-2 py-2 px-3 rounded-md ${
          location.pathname === '/journal' ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`}>
          <Book className="w-4 h-4 text-[#6698FF]" />
          <h2 className="text-sm font-medium text-gray-700">Journal</h2>
        </div>
      </Link>
      
      {/* Rae AI Assistant Link - Now second */}
      <Link to="/rae" onClick={(e) => handleClick(e, '/rae')}>
        <div className={`flex items-center space-x-2 py-2 px-3 rounded-md ${
          location.pathname === '/rae' ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`}>
          <Bot className="w-4 h-4 text-[#6698FF]" />
          <h2 className="text-sm font-medium text-gray-700">Rae</h2>
        </div>
      </Link>
    </div>
  );
};

export default JournalLink;
