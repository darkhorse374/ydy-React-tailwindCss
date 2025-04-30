import React, { useState, useEffect } from 'react';
import { Users, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import CommunityTagBadge from '@/components/community/CommunityTagBadge';
import { getAvatarColorClass } from '@/utils/communityUtils';
import { addJoinedCommunity, removeJoinedCommunity, isJoinedCommunity, isFixedCommunity } from '@/store/communitiesStore';
import { stringToColor } from '@/utils/stringUtils';

interface DashboardCommunityCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  members: number;
  onClick?: () => void;
  featured?: boolean;
}

const DashboardCommunityCard = ({
  id,
  title,
  description,
  tags,
  members,
  onClick,
  featured = false,
}: DashboardCommunityCardProps) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isFixed = isFixedCommunity(id);
  
  useEffect(() => {
    setIsJoined(isJoinedCommunity(id));
  }, [id]);
  
  const handleJoinLeave = () => {
    if (isJoined) {
      // Don't allow leaving fixed communities
      if (isFixed) {
        toast.info(`${title} is a default community and cannot be removed`);
        return;
      }
      
      removeJoinedCommunity(id);
      setIsJoined(false);
      toast.success(`Left ${title} community`);
      
      // Dispatch an event that the sidebar can listen to
      window.dispatchEvent(new CustomEvent('communityMembershipChanged', { 
        detail: { id, action: 'leave' } 
      }));
    } else {
      // If not joined, always allow joining (even fixed communities shouldn't need to be rejoined)
      addJoinedCommunity({
        id: id,
        name: title,
        color: getAvatarColorClass(title),
      });
      setIsJoined(true);
      toast.success(`Joined ${title} community`);
      
      // Dispatch an event that the sidebar can listen to
      window.dispatchEvent(new CustomEvent('communityMembershipChanged', { 
        detail: { id, action: 'join' } 
      }));
    }
  };

  return (
    <Card 
      className={`group h-full flex flex-col overflow-hidden transform transition-all duration-300 ${
        isHovered ? 'scale-[1.03] shadow-xl' : 'hover:shadow-lg'
      } border-2 ${featured ? 'border-[#6698FF]' : 'border-gray-200'} rounded-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="flex-grow space-y-4 p-0">
        <div 
          className="p-5 pb-3 relative bg-gray-50"
        >
          {featured && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium text-[#6698FF]">
              <Star size={12} className="fill-[#6698FF] text-[#6698FF]" />
              Featured
            </div>
          )}
          
          <h3 className="font-semibold text-lg mb-1 text-gray-800">{title}</h3>
        </div>
        
        <div className="px-5 space-y-4">
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <CommunityTagBadge key={index} tag={tag} />
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500 mt-1">+{tags.length - 3} more</span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users size={14} />
            <span>{members}+ Members</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-0 border-t border-gray-200">
        <div className="flex w-full">
          <Button
            variant={isJoined ? "outline" : "subtle"}
            size="sm"
            className="flex-1 h-9 rounded-none text-xs font-normal"
            onClick={handleJoinLeave}
            style={!isJoined ? { backgroundColor: '#F1F5FF', color: '#6699FF' } : {}}
          >
            {isJoined ? "LEAVE" : "JOIN"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-9 rounded-none text-xs font-normal w-full"
            onClick={onClick}
          >
            VIEW
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardCommunityCard;
