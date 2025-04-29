
import React from "react";
import CommunityCard from "./CommunityCard";
import { Button } from "@/components/ui/button";
import { CommunityData } from "@/types/community";

interface CommunityListProps {
  communities: CommunityData[];
  hasMore: boolean;
  onLoadMore: () => void;
}

const CommunityList = ({ communities, hasMore, onLoadMore }: CommunityListProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={onLoadMore}
            className="bg-gray-100 hover:bg-gray-200"
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default CommunityList;
