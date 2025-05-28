
import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSwiper } from "@/hooks/use-swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  hideNextCard?: boolean;
  opts?: {
    loop?: boolean;
    spaceBetween?: number;
    slidesPerView?: number | 'auto';
    breakpoints?: {
      [width: number]: {
        slidesPerView: number | 'auto';
        spaceBetween?: number;
      };
    };
  };
}

const SwiperCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ children, className, opts = {}, hideNextCard = false, ...props }, ref) => {
  const { 
    slidePrev, 
    slideNext, 
    onSwiper, 
    onSlideChange, 
    isBeginning, 
    isEnd 
  } = useSwiper();

  const defaultOptions = {
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
    ...opts,
  };

  return (
    <div 
      ref={ref}
      className={cn("relative", className)}
      {...props}
    >
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        spaceBetween={defaultOptions.spaceBetween}
        slidesPerView={defaultOptions.slidesPerView}
        loop={defaultOptions.loop}
        breakpoints={defaultOptions.breakpoints}
        className={cn("w-full", hideNextCard ? "overflow-hidden" : "overflow-visible")}
        style={{ 
          overflow: hideNextCard ? 'hidden' : 'visible', 
          position: 'relative',
          padding: '2px',
        }}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide 
            key={index} 
            className="h-auto"
            style={{ 
              height: 'auto', 
              display: 'flex', 
              justifyContent: 'center',
              width: '100%' 
            }}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative h-full w-full">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute h-10 w-10 rounded-full transition-all z-10 pointer-events-auto",
              "-left-5 top-1/2 -translate-y-1/2",
              "opacity-100 hover:opacity-100 hover:scale-110",
              "border border-gray-200 shadow-lg",
              "bg-white",
              isBeginning && "opacity-50 cursor-not-allowed hover:scale-100"
            )}
            disabled={isBeginning}
            onClick={slidePrev}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute h-10 w-10 rounded-full transition-all z-10 pointer-events-auto",
              "-right-5 top-1/2 -translate-y-1/2",
              "opacity-100 hover:opacity-100 hover:scale-110",
              "border border-gray-200 shadow-lg",
              "bg-white",
              isEnd && "opacity-50 cursor-not-allowed hover:scale-100"
            )}
            disabled={isEnd}
            onClick={slideNext}
          >
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </div>
  );
});

SwiperCarousel.displayName = "SwiperCarousel";

export { SwiperCarousel };
