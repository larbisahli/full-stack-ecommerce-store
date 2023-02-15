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
  prevButtonClassName = 'left-2',
  nextButtonClassName = 'right-2',
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
    'w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer absolute text-white focus:outline-none mx-2',
    { '3xl:text-2xl': buttonSize === 'default' },
    nextButtonClassName
  );
  let prevButtonClasses = cn(
    'w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer absolute text-white focus:outline-none mx-1',
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
          className={`flex items-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${buttonGroupClassName}`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              <ArrowBack width="3rem" height="3rem" />
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              <ArrowBack width="3rem" height="3rem" />
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              <ArrowForward width="3rem" height="3rem" />
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              <ArrowForward width="3rem" height="3rem" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Carousel);
