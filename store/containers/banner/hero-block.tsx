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
  contentClassName = 'py-20'
}) => {
  return (
    <div
      className={
        'min-h-[300px] md:min-h-[320px] lg:min-h-[500px] 3xl:min-h-[650px] 2xl:min-h-[530px]'
      }
    >
      <Carousel
        navigation={false}
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 6000
        }}
        loop
        speed={1500}
      >
        {heroBanners?.map((banner: any) => (
          <SwiperSlide key={`banner--key:${banner.id}`}>
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
