import ImageComponent from '@components/ImageComponent';
import ChevronForward from '@store/assets/icons/chevron-right';
import HomeOutline from '@store/assets/icons/home';
import { Category } from '@ts-types/generated';
import { isEmpty } from 'lodash';

import ActiveLink from './active-link';
import CategorySlider from './CategorySlider';

interface props {
  category: Category;
}

const CategoryHeader = ({ category = {} }: props) => {
  const { image = null, name, description, subCategories, parent } = category;

  console.log({ category });

  return (
    <div>
      {image && (
        <div className="relative h-[350px] md:h-[600px] mt-10 cateResponsive rounded">
          <div
            className={
              'w-full relative h-full bg-no-repeat bg-cover bg-center flex items-center z-0'
            }
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
            <div className="absolute z-50 bottom-8 pl-5 2xl:pl-16 xl:pl-8">
              <h2 className="text-4xl  md:text-6xl italic text-white text-skin-secondary xl:text-7xl 2xl:text-8xl font-manrope font-extrabold leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4">
                {name}
              </h2>
              <p className="text-white md:text-[17px] w-[85%] xl:w-[75%] md:w-[95%] font-semibold xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em]">
                {description}
              </p>
            </div>
            <div
              className="absolute h-full w-full overflow-hidden cateResponsive rounded"
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
