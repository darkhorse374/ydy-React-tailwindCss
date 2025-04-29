
import React from "react";
import { SwiperCarousel } from "@/components/ui/swiper-carousel";
import FeaturedCommunityCard from "./FeaturedCommunityCard";
import { CommunityData } from "@/types/community";

interface FeaturedCommunitiesProps {
  communities: CommunityData[];
  isMobile: boolean;
}

const FeaturedCommunities = ({ communities, isMobile }: FeaturedCommunitiesProps) => {
  return (
    <div className="relative">
      <SwiperCarousel
        opts={{
          loop: false,
          spaceBetween: 16,
          slidesPerView: isMobile ? 1 : "auto",
          breakpoints: {
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          },
        }}
        className="w-full"
      >
        {communities.map((community) => (
          <FeaturedCommunityCard key={community.id} community={community} />
        ))}
      </SwiperCarousel>
    </div>
  );
};

export default FeaturedCommunities;
