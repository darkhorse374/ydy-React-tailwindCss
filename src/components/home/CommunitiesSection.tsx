
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HomeCommunityCard from "./HomeCommunityCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { CommunityData } from "@/types/community"; 
import { SwiperCarousel } from "@/components/ui/swiper-carousel";

interface CommunitiesSectionProps {
  communities?: CommunityData[];
  onCommunitySelect?: (communityId: string) => void;
}

const CommunitiesSection: React.FC<CommunitiesSectionProps> = ({ 
  communities = [],
  onCommunitySelect 
}) => {
  const isMobile = useIsMobile();

  const handleCommunityClick = (communityId: string) => {
    if (onCommunitySelect) {
      onCommunitySelect(communityId);
    }
  };

  // Mark the first community as featured for visual emphasis
  const communitiesWithFeatured = communities.map((community, index) => ({
    ...community,
    featured: index === 0 // Mark the first community as featured
  }));

  return (
    <section className="mb-12 max-w-full">
      <div className="w-full relative">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2 px-2 md:px-6">
          <h2 className="text-2xl font-bold text-gray-800">JOIN A COMMUNITY</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/communities">
              <Button 
                variant="outline" 
                className="bg-gray-100 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap"
              >
                EXPLORE COMMUNITIES
              </Button>
            </Link>
            <Link to="/communities/create">
              <Button 
                className="text-xs md:text-sm whitespace-nowrap shadow-md bg-[#6698FF] hover:bg-[#5588EE] text-white"
              >
                CREATE A COMMUNITY
              </Button>
            </Link>
          </div>
        </div>

        <div className="px-2 md:px-6">
          <SwiperCarousel
            opts={{
              loop: false,
              spaceBetween: 16,
              slidesPerView: 1,
              breakpoints: {
                480: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 3,
                },
              },
            }}
            className="w-full"
            hideNextCard={false}
          >
            {communitiesWithFeatured.map((community, index) => (
              <HomeCommunityCard
                key={index}
                id={community.id.toString()}
                title={community.title}
                description={community.description}
                tags={community.tags}
                members={community.members}
                featured={community.featured}
                onClick={() => handleCommunityClick(community.id.toString())}
              />
            ))}
          </SwiperCarousel>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;
