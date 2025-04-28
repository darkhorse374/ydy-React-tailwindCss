
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";

interface ChatMember {
  id: string;
  name: string;
  isOwner: boolean;
}

interface ChatMemberListProps {
  members: ChatMember[];
  isMobileSheet?: boolean;
}

export const ChatMemberList = ({ members, isMobileSheet = false }: ChatMemberListProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleMemberClick = (memberId: string) => {
    navigate(`/user-profile/${memberId}`, {
      state: { 
        from: location.pathname,
        isChatRedirect: true
      }
    });
  };
  
  return (
    <div className={`
      ${isMobileSheet ? 'w-full' : 'w-56 hidden md:block border-l border-gray-200'} 
      bg-gray-50 flex-shrink-0 p-4 overflow-y-auto
    `}>
      {isMobileSheet && (
        <h2 className="text-lg font-semibold mb-4">Channel Members</h2>
      )}
      
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-3">Owners</h3>
        <div className="space-y-3">
          {members.filter(m => m.isOwner).map((member) => (
            <div 
              key={member.id} 
              className="flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-md p-1 transition-colors"
              onClick={() => handleMemberClick(member.id)}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-purple-100 text-purple-800 text-xs">
                    {member.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{member.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-bold mb-3">Members</h3>
        <div className="space-y-3">
          {members.filter(m => !m.isOwner).map((member) => (
            <div 
              key={member.id} 
              className="flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-md p-1 transition-colors"
              onClick={() => handleMemberClick(member.id)}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-gray-100 text-gray-800 text-xs">
                    {member.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{member.name}</span>
              </div>
              <span className="text-xl">😊</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
