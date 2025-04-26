
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CommunitySearch from "@/components/community/CommunitySearch";
import CommunityTagFilter from "@/components/community/CommunityTagFilter";
import FeaturedCommunities from "@/components/community/FeaturedCommunities";
import CommunityList from "@/components/community/CommunityList";
import { COMMUNITIES, ALL_TAGS } from "@/data/communitiesData";

const CommunitiesPage = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const featuredCommunities = COMMUNITIES.filter(community => community.isFeatured);
  
  const filteredCommunities = COMMUNITIES.filter(community => {
    const matchesSearch = searchQuery === "" || 
      community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => community.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const loadMore = () => {
    if (page < 3) {
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-64 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-100 opacity-40 blur-3xl"></div>
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-purple-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[500px] rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
        <div className="absolute -top-20 right-1/3 w-[300px] h-[300px] rounded-full bg-teal-100 opacity-30 blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6 px-4 md:px-6">
          <h1 className="text-2xl font-bold">EXPLORE COMMUNITIES</h1>
          <Button style={{ backgroundColor: "#6698FF" }} className="flex items-center gap-2 hover:bg-[#5588EE] text-white" asChild>
            <Link to="/communities/create">
              <Plus size={16} />
              Create a Community
            </Link>
          </Button>
        </div>

        <div className="mb-8 px-4 md:px-6">
          <CommunitySearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterClick={() => {}} // Add filter modal implementation if needed
          />
          
          <CommunityTagFilter 
            allTags={ALL_TAGS}
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
          />
        </div>

        <section className="mb-12 px-4 md:px-6">
          <h2 className="text-xl font-semibold mb-4">Featured Communities</h2>
          <FeaturedCommunities communities={featuredCommunities} isMobile={isMobile} />
        </section>

        <section className="px-4 md:px-6">
          <h2 className="text-xl font-semibold mb-4">All Communities</h2>
          <CommunityList 
            communities={filteredCommunities} 
            hasMore={hasMore} 
            onLoadMore={loadMore}
          />
        </section>
      </div>
    </div>
  );
};

export default CommunitiesPage;
