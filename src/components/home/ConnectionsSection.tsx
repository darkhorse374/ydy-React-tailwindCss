
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SwiperCarousel } from "@/components/ui/swiper-carousel";
import ConnectionCard from "@/components/dashboard/ConnectionCard";
import { ConnectionProfile } from "@/data/dashboardConnections";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ConnectionsSectionProps {
  connections: ConnectionProfile[];
  onConnectClick: () => void;
  title: string;
  className?: string;
}

const ConnectionsSection: React.FC<ConnectionsSectionProps> = ({ 
  connections, 
  onConnectClick, 
  title,
  className = ""
}) => {
  const isMobile = useIsMobile();
  
  return (
    <section className={`mb-4 max-w-full ${className}`}>
      <div className="w-full relative">
        <div className="flex justify-between items-center mb-6 px-2 md:px-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Link to="/connections">
            <Button variant="outline" className="bg-gray-100 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap">
              FIND CONNECTIONS
            </Button>
          </Link>
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
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 2,
                },
              },
            }}
            className="w-full"
            hideNextCard={false}
          >
            {connections.map((connection, index) => (
              <ConnectionCard 
                key={index}
                name={connection.name}
                feeling={connection.feeling}
                status={connection.status}
                bio={connection.bio}
                struggles={connection.struggles}
                interests={connection.interests}
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
