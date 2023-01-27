import Carousel from '@store/components/carousel/carousel';
import { SwiperSlide } from '@store/components/carousel/slider';
import { HeroBannerType } from '@ts-types/generated';
import React, { memo } from 'react';

import HeroBannerCard from './hero-banner-card';

interface Props {
  heroBanners?: HeroBannerType[];
  className?: string;
  contentClassName?: string;
}

const HeroSliderBlock: React.FC<Props> = ({
  heroBanners,
  className = 'mb-7',
  contentClassName = 'py-24'
}) => {
  return (
    <div className={className}>
      <Carousel
        pagination={{
          clickable: true
        }}
        navigation
        autoplay={{
          delay: 6000
        }}
        loop
        speed={1500}
      >
        {heroBanners?.map((banner: any) => (
          <SwiperSlide key={`banner--key${banner.id}`}>
            <HeroBannerCard
              banner={banner}
              variant="slider"
              className={contentClassName}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default memo(HeroSliderBlock);
