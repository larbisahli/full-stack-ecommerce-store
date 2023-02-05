import ImageComponent from '@components/ImageComponent';
import Pagination from '@components/ui/pagination';
import ChevronForward from '@store/assets/icons/chevron-right';
import HomeOutline from '@store/assets/icons/home';
import {
  Navigation,
  Swiper,
  SwiperSlide
} from '@store/components/carousel/slider';
import { Category } from '@ts-types/generated';
import { isEmpty } from 'lodash';

import ActiveLink from './active-link';
import CategorySlider from './CategorySlider';

interface props {
  category: Category;
}

const CategoryHeader = ({ category = {} }: props) => {
  const { image = null, name, subCategories, parent } = category;

  return (
    <div>
      {image && (
        <div className="relative h-[350px]">
          <div
            className={
              'w-full h-full bg-no-repeat bg-cover bg-center flex items-center z-0'
            }
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
            <div
              className="absolute h-full w-full overflow-hidden"
              style={{ zIndex: -1 }}
            >
              <ImageComponent
                src={`${process.env.S3_ENDPOINT}/${image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      )}
      <div className="w-full px-15px lg:px-35px mt-35px xxl:mt-60px">
        <div className="flex item-center ">
          <ActiveLink href={'/'}>
            <a className="inline-flex items-center">
              <div className="mr-1.5 text-15px">
                <HomeOutline height="1.2em" width="1.2em" />
              </div>
              Home
            </a>
          </ActiveLink>
          <div className="px-2 flex items-center text-gray-500">
            <ChevronForward></ChevronForward>
          </div>
          <div className="inline-flex items-center">Category</div>
          <div className="px-2 flex items-center text-gray-500">
            <ChevronForward></ChevronForward>
          </div>
          {!isEmpty(parent) && (
            <>
              <ActiveLink href={`/category/${parent?.name}`}>
                <a className="inline-flex items-center">{parent?.name}</a>
              </ActiveLink>
              <div className="px-2 flex items-center text-gray-500">
                <ChevronForward></ChevronForward>
              </div>
            </>
          )}
          <div className="inline-flex items-center font-semibold">{name}</div>
        </div>
        <div className="my-5">
          <CategorySlider categories={subCategories} label="Categories" />
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
