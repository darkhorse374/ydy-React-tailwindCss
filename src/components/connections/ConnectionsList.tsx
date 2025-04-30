
import React from "react";
import ConnectionCard from "./ConnectionCard";
import { Button } from "@/components/ui/button";

interface ConnectionsListProps {
  profiles: any[];
  visibleProfiles: number;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onLoadMore: () => void;
  onMessageClick: (profile: { id: number; name: string; image: string }) => void;
  onConnectClick: (profile?: any) => void;
  onViewProfile?: (profileId: number) => void;
  getStruggleVariant: (struggle: string) => string;
}

const ConnectionsList = ({
  profiles,
  visibleProfiles,
  onScroll,
  onLoadMore,
  onMessageClick,
  onConnectClick,
  onViewProfile,
  getStruggleVariant
}: ConnectionsListProps) => {
  const visibleProfilesData = profiles.slice(0, visibleProfiles);
  const hasMoreProfiles = visibleProfiles < profiles.length;

  return (
    <div>
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-6"
      >
        {visibleProfilesData.map((profile) => (
          <ConnectionCard 
            key={profile.id}
            profile={profile}
            onMessageClick={() => onMessageClick({
              id: profile.id,
              name: profile.name,
              image: profile.avatar || profile.image
            })}
            onConnectClick={() => onConnectClick(profile)}
            onViewProfile={() => onViewProfile && onViewProfile(profile.id)}
            getStruggleVariant={getStruggleVariant}
          />
        ))}
      </div>
      
      {hasMoreProfiles && (
        <div className="flex justify-center mb-8">
          <Button onClick={onLoadMore} variant="outline">Load more</Button>
        </div>
      )}
      
      {profiles.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No connections match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ConnectionsList;
