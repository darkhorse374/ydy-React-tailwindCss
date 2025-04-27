
import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ConnectionRequestModal from "@/components/connections/ConnectionRequestModal";
import CommunitiesSection from "@/components/home/CommunitiesSection";
import ConnectionsSection from "@/components/home/ConnectionsSection";
import { communityList } from "@/data/communitiesDetailData";
import { dashboardCommunities } from "@/data/dashboardCommunities";
import { connectionProfiles } from "@/data/dashboardConnections";
import { useNavigate } from "react-router-dom";
import { CommunityData } from "@/types/community";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [connectionRequestModalOpen, setConnectionRequestModalOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Filter out the "You Do You" community from display
  const filteredCommunities = dashboardCommunities.filter(community => community.id !== "ydy");
  
  // Transform to ensure they have all required CommunityData fields
  const enhancedCommunities: CommunityData[] = filteredCommunities.map(community => ({
    ...community,
    articles: 5, // Default value for articles count
    isFeatured: community.id === "hopeful-horizons", // Make one featured for visual emphasis
    isPublic: true, // Default value for public flag
  }));
  
  // Filter connections by struggles and interests for recommendation engine
  const similarStrugglesConnections = connectionProfiles.filter(profile => 
    profile.struggles.some(struggle => struggle.toLowerCase().includes("anxiety") || 
                                       struggle.toLowerCase().includes("depression"))
  );
  
  // Enhanced interests filtering to include more profiles
  const similarInterestsConnections = connectionProfiles.filter(profile => 
    profile.interests.some(interest => 
      interest.toLowerCase().includes("art") || 
      interest.toLowerCase().includes("meditation") ||
      interest.toLowerCase().includes("music") ||
      interest.toLowerCase().includes("reading") ||
      interest.toLowerCase().includes("cooking") ||
      interest.toLowerCase().includes("yoga")
    )
  );
  
  const handleSendConnectionRequest = () => {
    setConnectionRequestModalOpen(true);
  };

  const closeConnectionRequestModal = () => {
    setConnectionRequestModalOpen(false);
  };
  
  const handleCommunitySelect = (communityId: string) => {
    setSelectedCommunity(communityId);
    // Navigate to the community detail page when selected
    navigate(`/communities/${communityId}`);
  };

  const handleCloseWelcomeModal = () => {
    setWelcomeModalOpen(false);
    setShowAnimation(true);
  };

  // Ensure the page is scrolled to top when mounting, especially on mobile
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if this is the first visit to the dashboard
  useEffect(() => {
    const hasVisitedDashboard = localStorage.getItem('hasVisitedDashboard');
    if (!hasVisitedDashboard) {
      setWelcomeModalOpen(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
    } else {
      // Show content immediately without animation if returning user
      setShowAnimation(true);
    }
  }, []);

  // Share the selected community with the sidebar
  useEffect(() => {
    // This sets a global event that AppSidebar can listen to
    const event = new CustomEvent('dashboardCommunitySelected', { detail: selectedCommunity });
    window.dispatchEvent(event);
  }, [selectedCommunity]);
  
  // Prepare animation classes
  const contentClasses = `p-4 md:p-6 relative z-10 max-w-full overflow-hidden transition-all duration-500 ${
    showAnimation 
      ? 'translate-y-0 opacity-100' 
      : 'translate-y-full opacity-0'
  }`;
  
  return (
    <div className={contentClasses}>
      {/* Welcome Modal */}
      <Dialog open={welcomeModalOpen} onOpenChange={setWelcomeModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Welcome to You Do You</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Based on your profile we have matched you with communities and people we feel you may want to connect with. Check it out!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center mt-4">
            <Button 
              onClick={handleCloseWelcomeModal}
              className="bg-indigo-500 hover:bg-indigo-600 px-8"
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Community Section - Show all communities with expanded view */}
      <CommunitiesSection 
        communities={enhancedCommunities}
        onCommunitySelect={handleCommunitySelect}
      />

      {/* Similar Struggles Section */}
      <ConnectionsSection 
        connections={similarStrugglesConnections} 
        onConnectClick={handleSendConnectionRequest}
        title="SIMILAR STRUGGLES"
        className="mb-8"
      />
      
      {/* Similar Interests Section */}
      <ConnectionsSection 
        connections={similarInterestsConnections} 
        onConnectClick={handleSendConnectionRequest}
        title="SIMILAR INTERESTS"
        className="mb-8"
      />

      {/* Connection Request Modal */}
      <ConnectionRequestModal 
        isOpen={connectionRequestModalOpen}
        onClose={closeConnectionRequestModal}
      />
    </div>
  );
};

export default HomePage;
