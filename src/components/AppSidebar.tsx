import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Import the component sections
import CommunitiesSection from "@/components/sidebar/CommunitiesSection";
import NavigationLinks from "@/components/sidebar/NavigationLinks";
import JournalLink from "@/components/sidebar/JournalLink";
import DirectMessagesSection from "@/components/sidebar/DirectMessagesSection";
import ConnectionsSection from "@/components/sidebar/ConnectionsSection";

// Import types and state management
import { Community, DirectMessage, Connection } from "@/types/sidebar";
import { getJoinedCommunities } from "@/store/communitiesStore";

// Re-export community state functions for backwards compatibility
export { 
  getJoinedCommunities, 
  addJoinedCommunity, 
  removeJoinedCommunity, 
  isJoinedCommunity,
  isFixedCommunity 
} from "@/store/communitiesStore";

// Re-export the Community type for backwards compatibility
export type { Community };

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppSidebar = ({ isOpen, onClose }: AppSidebarProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize joined communities from localStorage on mount and location change
  useEffect(() => {
    setJoinedCommunities([...getJoinedCommunities()]);
  }, [location.pathname]);

  // Listen for community membership change events
  useEffect(() => {
    const handleMembershipChange = () => {
      setJoinedCommunities([...getJoinedCommunities()]);
    };

    window.addEventListener('communityMembershipChanged', handleMembershipChange);
    
    return () => {
      window.removeEventListener('communityMembershipChanged', handleMembershipChange);
    };
  }, []);

  // Reset scroll position to top when sidebar opens on mobile
  useEffect(() => {
    if (isOpen && isMobile && scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [isOpen, isMobile]);

  // Listen for community selection events from the dashboard
  useEffect(() => {
    const handleCommunitySelected = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSelectedCommunity(customEvent.detail);
    };

    window.addEventListener('dashboardCommunitySelected', handleCommunitySelected);
    
    return () => {
      window.removeEventListener('dashboardCommunitySelected', handleCommunitySelected);
    };
  }, []);

  const handleCommunityClick = (communityId: string) => {
    setSelectedCommunity(communityId);
    if (isMobile) {
      onClose();
    }
  };

  // Sample data for direct messages and connections
  const directMessages: DirectMessage[] = [
    { 
      id: 101, 
      name: "Sarah Johnson", 
      isOnline: true, 
      unreadCount: 3 
    },
    { 
      id: 102, 
      name: "David Miller", 
      isOnline: false, 
      unreadCount: 0 
    },
    { 
      id: 103, 
      name: "Emily Chang", 
      isOnline: false, 
      unreadCount: 1 
    },
  ];

  const connections: Connection[] = [
    { id: 1, name: "Alex Thompson" }, 
    { id: 2, name: "Jamie Lee" }, 
    { id: 3, name: "Chris Rodriguez" }, 
    { id: 4, name: "Morgan Smith" }, 
    { id: 5, name: "Taylor Jones" }, 
    { id: 6, name: "Jordan Williams" },
    { id: 7, name: "Casey Parker" },
    { id: 8, name: "Riley Morgan" },
    { id: 9, name: "Quinn Johnson" },
    { id: 10, name: "Avery Wilson" },
    { id: 11, name: "Blake Anderson" },
    { id: 12, name: "Charlie Thomas" },
    { id: 13, name: "Dakota Martin" },
    { id: 14, name: "Drew Campbell" },
    { id: 15, name: "Finley Brown" },
    { id: 16, name: "Harper Kim" },
    { id: 17, name: "Jaden Patel" },
    { id: 18, name: "Kennedy Clark" },
    { id: 19, name: "London Wright" },
    { id: 20, name: "Micah Scott" },
    { id: 21, name: "Noah Garcia" },
    { id: 22, name: "Parker Evans" },
    { id: 23, name: "Reagan Lewis" },
    { id: 24, name: "Sage Baker" },
    { id: 25, name: "Tatum Mitchell" },
    { id: 26, name: "Winter Nguyen" },
    { id: 27, name: "Zion Jackson" },
    { id: 28, name: "Aria Robinson" },
    { id: 29, name: "Briar Taylor" },
    { id: 30, name: "Cypress Lee" }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 flex-1" ref={scrollRef}>
        {/* Home Link - Changed from Dashboard */}
        <div className="mb-4">
          <Link to="/dashboard" onClick={isMobile ? onClose : undefined}>
            <div className={`flex items-center justify-between py-2 px-3 rounded-md ${
              location.pathname === '/dashboard' ? 'bg-purple-100' : 'hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="w-4 h-4 text-[#6698FF]" />
                <h2 className="text-sm font-medium text-gray-700">Home</h2>
              </div>
            </div>
          </Link>
        </div>

        <CommunitiesSection 
          joinedCommunities={joinedCommunities}
          selectedCommunity={selectedCommunity}
          onCommunityClick={handleCommunityClick}
        />

        <NavigationLinks onLinkClick={isMobile ? onClose : undefined} />

        <JournalLink onLinkClick={onClose} />

        {/* Add separator line below Journal and above Direct Messages */}
        <Separator className="my-4" />
        
        <DirectMessagesSection 
          directMessages={directMessages} 
          onLinkClick={isMobile ? onClose : undefined}
        />
        
        <ConnectionsSection 
          connections={connections} 
          onLinkClick={onClose}
        />
      </div>
      
      {isMobile && (
        <div className="p-4 border-t border-gray-200">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Close Menu</Button>
          </DrawerClose>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="h-[85vh] max-h-[85vh]">
          {sidebarContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside className="hidden md:flex flex-col h-screen">
      <div className="bg-white border-r border-gray-200 w-64 m-6 rounded-lg shadow-sm overflow-hidden flex flex-col">
        {sidebarContent}
      </div>
    </aside>
  );
};

export default AppSidebar;
