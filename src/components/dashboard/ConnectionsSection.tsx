
import React from "react";
import { Button } from "@/components/ui/button";
import { SwiperCarousel } from "@/components/ui/swiper-carousel";
import { Link } from "react-router-dom";
import ConnectionCard from "./ConnectionCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { ConnectionProfile } from "@/data/dashboardConnections";

interface ConnectionsSectionProps {
  connections: ConnectionProfile[];
  onConnectClick: () => void;
  title?: string;
  className?: string;
}

const ConnectionsSection: React.FC<ConnectionsSectionProps> = ({ 
  connections, 
  onConnectClick,
  title = "CONNECT WITH OTHERS",
  className = ""
}) => {
  const isMobile = useIsMobile();

  return (
    <section className={className}>
      <div className="w-full relative">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2 px-2 md:px-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link to="/connections">
            <Button variant="outline" className="bg-gray-100 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap">
              FIND CONNECTIONS
            </Button>
          </Link>
        </div>

        <div className="relative overflow-hidden px-2 md:px-6">
          <SwiperCarousel
            opts={{
              loop: false,
              spaceBetween: 16,
              slidesPerView: isMobile ? 1 : "auto",
              breakpoints: {
                640: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
              },
            }}
            className="w-full"
            hideNextCard={true}
          >
            {connections.map((profile, index) => (
              <ConnectionCard
                key={index}
                name={profile.name}
                feeling={profile.feeling}
                status={profile.status}
                bio={profile.bio}
                struggles={profile.struggles}
                interests={profile.interests}
                onConnectClick={onConnectClick}
              />
            ))}
          </SwiperCarousel>
        </div>
      </div>
    </section>
  );
};

export default ConnectionsSection;
