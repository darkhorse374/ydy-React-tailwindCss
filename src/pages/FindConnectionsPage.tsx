
import React, { useState } from "react";
import { connectionProfiles } from "@/data/connectionProfiles";
import { getTagVariant } from "@/utils/communityUtils";
import MessageModal from "@/components/chat/MessageModal";
import ConnectionRequestModal from "@/components/connections/ConnectionRequestModal";
import ConnectionSearchBar from "@/components/connections/ConnectionSearchBar";
import ConnectionsList from "@/components/connections/ConnectionsList";
import { useNavigate } from "react-router-dom";

const FindConnectionsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleProfiles, setVisibleProfiles] = useState(8);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [connectionRequestModalOpen, setConnectionRequestModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setVisibleProfiles(8);
  };

  const loadMore = () => {
    setVisibleProfiles(prev => Math.min(prev + 4, filteredProfiles.length));
  };

  const filteredProfiles = connectionProfiles.filter(profile => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.bio.toLowerCase().includes(searchLower) ||
      profile.struggles.some(s => s.toLowerCase().includes(searchLower)) ||
      profile.interests.some(i => i.toLowerCase().includes(searchLower))
    );
  });
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && visibleProfiles < filteredProfiles.length) {
      loadMore();
    }
  };

  const openMessageModal = (profile: { id: number; name: string; image: string }) => {
    setSelectedProfile(profile);
    setMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
    setSelectedProfile(null);
  };

  const handleSendConnectionRequest = () => {
    setConnectionRequestModalOpen(true);
  };

  const closeConnectionRequestModal = () => {
    setConnectionRequestModalOpen(false);
  };

  const handleViewProfile = (profileId: number) => {
    navigate(`/user-profile/${profileId}`, { state: { fromPeople: true } });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto h-full">
      <h1 className="text-2xl font-bold mb-6">Find a connection by name, struggles, or interests</h1>
      
      <ConnectionSearchBar 
        searchTerm={searchTerm}
        onChange={handleSearch}
      />
      
      <div className="overflow-auto h-full pb-6" onScroll={handleScroll}>
        <ConnectionsList
          profiles={filteredProfiles}
          visibleProfiles={visibleProfiles}
          onScroll={() => {}} // Empty function as we're handling scroll in the parent
          onLoadMore={loadMore}
          onMessageClick={openMessageModal}
          onConnectClick={handleSendConnectionRequest}
          onViewProfile={handleViewProfile}
          getStruggleVariant={getTagVariant}
        />
      </div>

      {selectedProfile && (
        <MessageModal 
          isOpen={messageModalOpen}
          onClose={closeMessageModal}
          recipient={{
            id: selectedProfile.id,
            name: selectedProfile.name,
            image: selectedProfile.image
          }}
        />
      )}

      <ConnectionRequestModal 
        isOpen={connectionRequestModalOpen}
        onClose={closeConnectionRequestModal}
      />
    </div>
  );
};

export default FindConnectionsPage;
