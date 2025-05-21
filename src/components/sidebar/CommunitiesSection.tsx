
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Plus } from "lucide-react";
import { Community } from "@/types/sidebar";
import { getInitials } from "@/utils/stringUtils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getJoinedCommunities, isFixedCommunity } from "@/store/communitiesStore";

interface CommunitiesSectionProps {
  joinedCommunities: Community[];
  selectedCommunity: string | null;
  onCommunityClick: (communityId: string) => void;
}

const CommunitiesSection = ({ 
  joinedCommunities, 
  selectedCommunity, 
  onCommunityClick 
}: CommunitiesSectionProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(true);
  const [communityActivity, setCommunityActivity] = useState({
    "ydy": 3,
    "hopeful-horizons": 2,
    "bipolar-bears": 0,
  });
  
  const [currentJoinedCommunities, setCurrentJoinedCommunities] = useState<Community[]>(getJoinedCommunities());

  useEffect(() => {
    const handleMembershipChange = () => {
      setCurrentJoinedCommunities([...getJoinedCommunities()]);
    };

    window.addEventListener('communityMembershipChanged', handleMembershipChange);
    
    return () => {
      window.removeEventListener('communityMembershipChanged', handleMembershipChange);
    };
  }, []);

  useEffect(() => {
    if (selectedCommunity && communityActivity[selectedCommunity as keyof typeof communityActivity] > 0) {
      setCommunityActivity(prev => ({
        ...prev,
        [selectedCommunity]: 0
      }));
    }
  }, [selectedCommunity]);

  const handleCommunityClick = (communityId: string, event: React.MouseEvent) => {
    event.preventDefault();
    onCommunityClick(communityId);
    
    navigate(`/communities/${communityId}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold uppercase text-[#6698FF]">Communities</h2>
        <button
          onClick={() => setIsCommunitiesOpen(!isCommunitiesOpen)}
          className="focus:outline-none"
        >
          <ChevronRight className={`w-4 h-4 text-[#6698FF] transform ${isCommunitiesOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>
      
      {isCommunitiesOpen && (
        <div>
          <div className="pr-2 max-h-[300px] overflow-auto">
            <ul className="space-y-1.5">
              {currentJoinedCommunities.map((community) => (
                <li key={`community-${community.id}`} className="relative">
                  <Link 
                    to={`/communities/${community.id}`}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-md ${
                      selectedCommunity === community.id.toString() ? 'bg-purple-100' : 'hover:bg-gray-50'
                    }`}
                    onClick={(e) => handleCommunityClick(community.id.toString(), e)}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-7 h-7 ${community.color || 'bg-blue-400'} rounded-full flex items-center justify-center text-white text-xs`}>
                        {community.id === "ydy" ? (
                          <span>:):</span>
                        ) : (
                          <span>{getInitials(community.name)}</span>
                        )}
                      </div>
                      <span className="truncate text-sm">{community.name}</span>
                      {community.id === "ydy" && (
                        <span className="text-[9px] px-1 py-0.5 bg-gray-100 text-gray-500 rounded">DEFAULT</span>
                      )}
                    </div>
                    {communityActivity[community.id as keyof typeof communityActivity] > 0 && (
                      <Badge variant="outline" className="bg-[#6698FF] border-[#6698FF] text-white text-[10px] h-4 min-w-4 flex items-center justify-center rounded-full px-1">
                        {communityActivity[community.id as keyof typeof communityActivity]}
                      </Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* "Explore More" link positioned right below the communities list */}
          <div className="mt-2">
            <Link 
              to="/communities" 
              className="flex items-center space-x-2.5 text-[#6698FF] px-2 py-1.5 rounded-md hover:bg-gray-50"
            >
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-[#6698FF]">
                <Plus className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-medium">Explore More</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesSection;
