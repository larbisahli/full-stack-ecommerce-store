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
  thumbnailClassName = 'xl:w-[480px] 2xl:w-[750px]',
  galleryClassName = 'xl:w-28 2xl:w-[130px]'
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<{ swiper: SwiperType }>(null);

  const dir = 'ltr';

  const [thumbsSwiperInstance, setThumbsSwiperInstance] =
    useState<SwiperType>(null);

  return (
    <div className="max-w-[650px] 2xxl:max-w-[750px ">
      <div
        style={{ height: 'fit-content' }}
        className={cn(
          'w-full xl:ms-5 mb-2.5 md:mb-3 border border-skin-base overflow-hidden rounded-md relative group',
          thumbnailClassName
        )}
      >
        <Swiper
          // @ts-ignore
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
          {gallery?.map(({ id, image, placeholder }) => (
            <SwiperSlide
              key={`product-gallery-${id}`}
              className="flex items-center justify-center"
            >
              <ImageComponent
                src={image ?? siteSettings.product.image}
                customPlaceholder={
                  placeholder ?? siteSettings.product.placeholder
                }
                width={750}
                height={690}
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="items-center justify-between w-full absolute top-2/4 z-10 px-2.5 group-hover:flex hidden">
          <div
            ref={prevRef}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center cursor-pointer justify-center rounded-full bg-skin-fill transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            <ArrowBack />
          </div>
          <div
            ref={nextRef}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center justify-center cursor-pointer rounded-full bg-skin-fill  transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            <ArrowForward />
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`flex-shrink-0 ${galleryClassName}`}>
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
          {[...gallery]?.map(({ id, image, placeholder }) => (
            <SwiperSlide
              key={`product-thumb-gallery-${id}`}
              className="flex items-center justify-center cursor-pointer overflow-hidden border border-skin-base transition hover:opacity-75"
            >
              <ImageComponent
                src={image ?? siteSettings.product.image}
                customPlaceholder={
                  placeholder ?? siteSettings.product.placeholder
                }
                width={45}
                height={45}
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(ThumbnailCarousel);
