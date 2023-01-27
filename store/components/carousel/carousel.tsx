import 'swiper/css/autoplay';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import ArrowBack from '@store/assets/icons/chevron-left';
import ArrowForward from '@store/assets/icons/chevron-right';
import {
  Autoplay,
  Grid,
  Navigation,
  Pagination,
  Swiper
} from '@store/components/carousel/slider';
import cn from 'classnames';
import { useRef } from 'react';
import React, { memo } from 'react';

type CarouselPropsType = {
  children: React.ReactNode;
  className?: string;
  buttonGroupClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  buttonSize?: 'default' | 'small';
  centeredSlides?: boolean;
  loop?: boolean;
  slidesPerColumn?: number;
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  autoplay?: {} | any;
  grid?: {} | any;
  speed?: number;
};

const Carousel: React.FunctionComponent<CarouselPropsType> = ({
  children,
  className = '',
  buttonGroupClassName = '',
  prevActivateId = '',
  nextActivateId = '',
  prevButtonClassName = 'left-2 lg:-start-4 xl:-start-5',
  nextButtonClassName = 'right-2 lg:-end-4 xl:-end-5',
  buttonSize = 'default',
  breakpoints,
  navigation = true,
  pagination = false,
  loop = false,
  grid,
  autoplay,
  speed,
  ...props
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const dir = 'ltr';

  let nextButtonClasses = cn(
    'w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-white xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-skin-fill absolute transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform shadow-navigation',
    { '3xl:text-2xl': buttonSize === 'default' },
    nextButtonClassName
  );
  let prevButtonClasses = cn(
    'w-7 h-7 md:w-8 md:h-8 lg:w-9 bg-white lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-skin-fill absolute transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform shadow-navigation',
    { '3xl:text-2xl': buttonSize === 'default' },
    prevButtonClassName
  );
  return (
    <div
      className={`carouselWrapper relative ${className} ${
        pagination ? 'dotsCircle' : 'dotsCircleNone'
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        breakpoints={breakpoints}
        dir={dir}
        loop={loop}
        pagination={pagination}
        grid={grid}
        speed={speed}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current! // Assert non-null
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              <ArrowBack />
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              <ArrowBack />
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              <ArrowForward />
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              <ArrowForward />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Carousel);
