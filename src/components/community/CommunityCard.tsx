import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import CommunityTagBadge from "./CommunityTagBadge";
import { getInitials, stringToColor } from "@/utils/stringUtils";
import { getCommunityCardBackground, getAvatarColorClass } from "@/utils/communityUtils";
import { addJoinedCommunity, removeJoinedCommunity, isJoinedCommunity, isFixedCommunity } from "@/store/communitiesStore";
import { CommunityData } from "@/types/community";
import { toast } from "sonner";

interface CommunityCardProps {
  community: CommunityData;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const [isJoined, setIsJoined] = useState(false);
  const initials = getInitials(community.title);
  const avatarColor = stringToColor(community.title);
  const isFixed = isFixedCommunity(community.id);
  
  useEffect(() => {
    setIsJoined(isJoinedCommunity(community.id));
  }, [community.id]);
  
  const handleJoinLeave = () => {
    if (isJoined) {
      // Don't allow leaving fixed communities
      if (isFixed) {
        toast.info(`${community.title} is a default community and cannot be removed`);
        return;
      }
      
      removeJoinedCommunity(community.id);
      setIsJoined(false);
      toast.success(`Left ${community.title} community`);
      
      // Dispatch an event that the sidebar can listen to
      window.dispatchEvent(new CustomEvent('communityMembershipChanged', { 
        detail: { id: community.id, action: 'leave' } 
      }));
    } else {
      // Allow joining any community
      addJoinedCommunity({
        id: community.id,
        name: community.title,
        color: getAvatarColorClass(community.title),
      });
      setIsJoined(true);
      toast.success(`Joined ${community.title} community`);
      
      // Dispatch an event that the sidebar can listen to
      window.dispatchEvent(new CustomEvent('communityMembershipChanged', { 
        detail: { id: community.id, action: 'join' } 
      }));
    }
  };
  
  return (
    <Card className="overflow-hidden border border-gray-200 shadow-sm h-full flex flex-col">
      <div 
        className="p-4 relative" 
        style={getCommunityCardBackground(community.title, community.banner)}
      >
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 border-2 border-white shadow-md">
            <AvatarFallback style={{ backgroundColor: avatarColor }}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{community.title}</h3>
        </div>
        
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {community.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {community.tags.map((tag, index) => (
            <CommunityTagBadge key={index} tag={tag} />
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{community.members}+ Members</span>
          </div>
          <div>{community.articles}+ Articles</div>
        </div>
      </div>
      
      <CardFooter className="p-0 mt-auto border-t border-gray-200 w-full">
        <div className="flex w-full">
          <Button 
            variant={isJoined ? "outline" : "subtle-purple"}
            size="sm" 
            className="rounded-none m-0 h-9 flex-1 text-xs font-normal"
            onClick={handleJoinLeave}
            style={!isJoined ? { backgroundColor: '#F1F5FF', color: '#6698FF' } : {}}
          >
            {isJoined ? "LEAVE" : "JOIN"}
          </Button>
          <Link to={`/communities/${community.id}`} className="flex-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-none m-0 h-9 w-full text-xs font-normal text-gray-600 hover:text-gray-900"
            >
              VIEW
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
