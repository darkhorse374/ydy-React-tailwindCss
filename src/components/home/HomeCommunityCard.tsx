import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { getTagVariant } from "@/utils/communityUtils";
import { isJoinedCommunity, addJoinedCommunity, removeJoinedCommunity } from "@/store/communitiesStore";
import { toast } from "sonner";

interface HomeCommunityCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  members: number;
  featured?: boolean;
  onClick: () => void;
}

const HomeCommunityCard = ({ 
  id, 
  title, 
  description, 
  tags, 
  members, 
  featured = false,
  onClick 
}: HomeCommunityCardProps) => {
  const [isJoined, setIsJoined] = useState(false);
  
  useEffect(() => {
    setIsJoined(isJoinedCommunity(id));
  }, [id]);
  
  const formatMembers = (count: number) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isJoined) {
      removeJoinedCommunity(id);
      setIsJoined(false);
      toast.success(`Left ${title} community`);
    } else {
      addJoinedCommunity({
        id,
        name: title,
        color: "bg-blue-500",
      });
      setIsJoined(true);
      toast.success(`Joined ${title} community`);
    }
    
    window.dispatchEvent(new CustomEvent('communityMembershipChanged', { 
      detail: { id, action: isJoined ? 'leave' : 'join' } 
    }));
  };

  return (
    <Card
      className={`w-full h-[290px] shadow-sm cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] relative ${
        featured ? 'border-[#6698FF] border-2' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#6698FF] text-white text-xs py-1 px-2 rounded-bl-md">
            Featured
          </div>
        </div>
      )}
      
      <CardContent className="p-5 pb-0 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag, index) => {
              const variant = getTagVariant(tag) as "depression" | "anxiety" | "isolation" | "bipolar" | 
                "mood" | "medication" | "focus" | "panic" | "stress" | "ptsd" | 
                "trauma" | "recovery" | "insomnia" | "social" | "about" | "default" | 
                "secondary" | "destructive" | "outline";
              
              return (
                <Badge 
                  key={index} 
                  variant={variant}
                  className="text-[10px] px-2 py-0.5 shadow-sm"
                >
                  {tag}
                </Badge>
              );
            })}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            <span>{formatMembers(members)} members</span>
          </div>
        </div>
        
        <div className="flex w-full mt-auto -mx-5">
          <div className="flex w-full">
            <Button
              variant={isJoined ? "outline" : "subtle"}
              size="compact"
              className="flex-1 h-9 rounded-none text-xs border-t border-r-0 border-b-0 w-full"
              onClick={handleJoinClick}
              style={!isJoined ? { backgroundColor: '#F1F5FF', color: '#6699FF' } : {}}
            >
              {isJoined ? "LEAVE" : "JOIN"}
            </Button>
            <Button
              variant="ghost"
              size="compact"
              className="flex-1 h-9 rounded-none border-t border-r-0 border-b-0 text-xs font-normal w-full"
              onClick={onClick}
            >
              VIEW
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeCommunityCard;
