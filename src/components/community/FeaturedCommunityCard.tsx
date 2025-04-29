import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CommunityTagBadge from "./CommunityTagBadge";
import { getInitials, stringToColor } from "@/utils/stringUtils";
import { getAvatarColorClass } from "@/utils/communityUtils";
import { addJoinedCommunity, removeJoinedCommunity, isJoinedCommunity, isFixedCommunity } from "@/store/communitiesStore";
import { CommunityData } from "@/types/community";
import { toast } from "sonner";

interface FeaturedCommunityCardProps {
  community: CommunityData;
}

const FeaturedCommunityCard = ({ community }: FeaturedCommunityCardProps) => {
  const [isJoined, setIsJoined] = useState(false);
  const initials = getInitials(community.title);
  const avatarColor = stringToColor(community.title);
  const isFixed = isFixedCommunity(community.id);
  
  useEffect(() => {
    setIsJoined(isJoinedCommunity(community.id));
  }, [community.id]);
  
  const handleJoinLeave = () => {
    if (isJoined) {
      if (isFixed) {
        toast.info(`${community.title} is a default community and cannot be removed`);
        return;
      }
      
      removeJoinedCommunity(community.id);
      setIsJoined(false);
      toast.success(`Left ${community.title} community`);
      
      window.dispatchEvent(new CustomEvent('communityMembershipChanged', { 
        detail: { id: community.id, action: 'leave' } 
      }));
    } else {
      addJoinedCommunity({
        id: community.id,
        name: community.title,
        color: getAvatarColorClass(community.title),
      });
      setIsJoined(true);
      toast.success(`Joined ${community.title} community`);
      
      window.dispatchEvent(new CustomEvent('communityMembershipChanged', { 
        detail: { id: community.id, action: 'join' } 
      }));
    }
  };
  
  const posts = community.posts || [];
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div 
          className="md:w-1/2 p-4 relative" 
          style={{ 
            background: `linear-gradient(135deg, ${community.banner || '#f3f4f6'} 0%, ${stringToColor(community.title, 85, 75)} 100%)`,
            boxShadow: "inset 0 0 0 2000px rgba(255, 255, 255, 0.15)"
          }}
        >
          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm shadow-lg"></div>
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
              <AvatarFallback style={{ backgroundColor: avatarColor }}>
                {initials}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg">{community.title}</h3>
          </div>
          
          <p className="text-sm text-gray-700 mb-3">
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
            <div>{community.articles || 0}+ Articles</div>
          </div>
        </div>
        
        <div className="md:w-1/2 p-4 bg-white border-t md:border-t-0 md:border-l border-gray-200">
          <h4 className="font-medium mb-3">Recent Posts</h4>
          {posts.length > 0 ? (
            <ul className="space-y-3">
              {posts.map((post, index) => (
                <li key={index} className="text-sm pb-2 border-b border-gray-100">
                  <Link 
                    to={`/communities/${community.id}/posts/${post.id}`} 
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {post.title || "Untitled Post"}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No posts yet</p>
          )}
        </div>
      </div>
      
      <div className="mt-auto border-t border-gray-200 flex w-full">
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
    </div>
  );
};

export default FeaturedCommunityCard;
