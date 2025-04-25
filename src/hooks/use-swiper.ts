
import { useState, useRef } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';

interface UseSwiperOptions {
  loop?: boolean;
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  breakpoints?: {
    [width: number]: {
      slidesPerView: number | 'auto';
      spaceBetween?: number;
    };
  };
}

export function useSwiper(options: UseSwiperOptions = {}) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const onSwiper = (swiperInstance: SwiperInstance) => {
    setSwiper(swiperInstance);
    swiperRef.current = swiperInstance;
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  const onSlideChange = (swiperInstance: SwiperInstance) => {
    setActiveIndex(swiperInstance.activeIndex);
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  const slidePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const slideNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const slideTo = (index: number) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  return {
    swiper,
    activeIndex,
    isBeginning,
    isEnd,
    onSwiper,
    onSlideChange,
    slidePrev,
    slideNext,
    slideTo,
    swiperRef,
  };
}
