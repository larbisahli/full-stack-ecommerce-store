import ImageComponent from '@components/ImageComponent';
import { siteSettings } from '@settings/site.settings';
import ArrowBack from '@store/assets/icons/chevron-left';
import ArrowForward from '@store/assets/icons/chevron-right';
import {
  Navigation,
  Swiper,
  SwiperOptions,
  SwiperSlide,
  SwiperType,
  Thumbs
} from '@store/components/carousel/slider';
import { ImageType } from '@ts-types/generated';
import cn from 'classnames';
import React from 'react';
import { memo, useRef, useState } from 'react';

interface Props {
  // eslint-disable-next-line no-unused-vars
  setSwiperThumbnailInstance: (key: any) => void;
  gallery: ImageType[];
  thumbnailClassName?: string;
  galleryClassName?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  '0': {
    slidesPerView: 4
  }
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0
};

const ThumbnailCarousel: React.FC<Props> = ({
  setSwiperThumbnailInstance,
  gallery,
  thumbnailClassName = ''
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<{ swiper: SwiperType }>(null);

  const [thumbsSwiperInstance, setThumbsSwiperInstance] =
    useState<SwiperType>(null);

  return (
    <div className="select-none">
      <div
        className={cn(
          'w-full mx-auto max-w-[1200px] bg-gray-100 mb-2.5 md:mb-3 border border-skin-base rounded-md relative group',
          thumbnailClassName
        )}
      >
        <Swiper
          // @ts-ignore
          loop={true}
          ref={swiperRef}
          id="productGallery"
          onSwiper={setSwiperThumbnailInstance}
          thumbs={{
            swiper:
              thumbsSwiperInstance && !thumbsSwiperInstance.destroyed
                ? thumbsSwiperInstance
                : null
          }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current! // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery?.map(({ image }) => (
            <SwiperSlide
              key={`product-gallery-${image}`}
              className="flex items-center justify-center"
            >
              <ImageComponent
                src={
                  image
                    ? `${process.env.S3_ENDPOINT}/${image}`
                    : siteSettings.product.image
                }
                width={1200}
                height={600}
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="items-center justify-between w-full absolute top-2/4 z-10 px-2.5 group-hover:flex hidden">
          <div
            ref={prevRef}
            className="w-7 h-7 md:w-8 md:h-8 bg-white lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center cursor-pointer justify-center rounded-full bg-skin-fill transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            <ArrowBack />
          </div>
          <div
            ref={nextRef}
            className="w-7 h-7 md:w-8 md:h-8  bg-white lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center justify-center cursor-pointer rounded-full bg-skin-fill  transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            <ArrowForward />
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className="flex-shrink-0">
        <Swiper
          id="productGalleryThumbs"
          modules={[Thumbs]}
          onSwiper={setThumbsSwiperInstance}
          spaceBetween={0}
          watchSlidesProgress
          freeMode
          observer
          observeParents
          breakpoints={galleryCarouselBreakpoints}
        >
          {gallery?.map(({ image }) => (
            <SwiperSlide
              key={`product-thumb-gallery-${image}`}
              className="flex items-center justify-center cursor-pointer overflow-hidden border border-skin-base transition hover:opacity-75"
            >
              <ImageComponent
                src={
                  image
                    ? `${process.env.S3_ENDPOINT}/${image}`
                    : siteSettings.product.image
                }
                width={75}
                height={75}
                objectFit="contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(ThumbnailCarousel);
