import ImageComponent from '@components/ImageComponent';
import Pagination from '@components/ui/pagination';
import {
  Navigation,
  Swiper,
  SwiperSlide
} from '@store/components/carousel/slider';
import { Category } from '@ts-types/generated';

import ActiveLink from './active-link';

interface props {
  categories: Category[];
  label: string;
}

const CategorySlider = ({ categories, label }: props) => {
  return (
    <div className="w-full">
      <div className="my-5">
        {categories && (
          <>
            <div className="my-8 font-semibold text-xl">{label}</div>
            <Swiper
              id="categoryProducts"
              slidesPerView={3}
              spaceBetween={10}
              pagination={{
                clickable: true
              }}
              breakpoints={{
                550: {
                  slidesPerView: 3
                },
                640: {
                  slidesPerView: 5
                },
                1024: {
                  slidesPerView: 7
                },
                1350: {
                  slidesPerView: 8
                },
                1650: {
                  slidesPerView: 10
                }
              }}
              modules={[Navigation, Pagination]}
            >
              {categories?.map((cate, index) => {
                return (
                  <SwiperSlide
                    key={`category-product-${cate.id}-${index}`}
                    className=""
                  >
                    <ActiveLink href={`/category/${cate?.name}`}>
                      <a className="relative inline-flex font-bold items-center border border-gray-300 rounded shadow mr-3">
                        <div
                          style={{ background: 'rgba(0,0,0,0.2)' }}
                          className="absolute top-0 left-0 right-0 bottom-0 z-40"
                        ></div>
                        <ImageComponent
                          objectFit="cover"
                          height={132}
                          width={132}
                          src={
                            cate?.image
                              ? `${process.env.S3_ENDPOINT}/${cate?.image}`
                              : '/category-placeholder.jpg'
                          }
                        />
                        <p
                          style={{ background: 'rgba(0,0,0,0.4)' }}
                          className="absolute text-white z-50 bottom-0 px-2 py-1 w-full"
                        >
                          {cate?.name}
                        </p>
                      </a>
                    </ActiveLink>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default CategorySlider;
