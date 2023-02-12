/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import 'react-multi-carousel/lib/styles.css';

import ImageComponent from '@components/ImageComponent';
import CategoriesSvg from '@store/assets/icons/categories';
import ChevronLeft from '@store/assets/icons/chevron-left';
import ChevronRight from '@store/assets/icons/chevron-right';
import ItemCard from '@store/components/item-card';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { Category } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useContext } from 'react';
import React from 'react';
import Carousel from 'react-multi-carousel';

import ActiveLink from '../../components/active-link';

interface props {
  categories: Category[];
  label: string;
}

type NavButtonProps = {
  onClick: Function;
  children: React.ReactNode | undefined;
};

const PrevButton: React.FC<NavButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label="prev-button"
      className="w-40px h-40px rounded-full	flex items-center justify-center bg-white shadow-cart text-gray-900 absolute left-0 -ml-20px focus:outline-none"
    >
      {children}
    </button>
  );
};
const NextButton: React.FC<NavButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label="next-button"
      className="w-40px h-40px rounded-full	flex items-center justify-center bg-white shadow-cart text-gray-900 absolute right-0 -mr-20px focus:outline-none"
    >
      {children}
    </button>
  );
};

type ButtonGroupProps = {
  next?: Function;
  previous?: Function;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ next, previous }) => {
  return (
    <div className="absolute top-half w-full -mt-20px">
      <PrevButton onClick={() => previous()}>
        <ChevronLeft />
      </PrevButton>
      <NextButton onClick={() => next()}>
        <ChevronRight />
      </NextButton>
    </div>
  );
};

const ProductTopSells = ({ items = [] }: any) => {
  const responsive = {
    desktopExtraLarge: {
      breakpoint: { max: 3000, min: 2000 },
      items: 10
    },
    desktopLarge: {
      breakpoint: { max: 2000, min: 1281 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1280, min: 1101 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1100, min: 861 },
      items: 3
    },
    tabletSmall: {
      breakpoint: { max: 860, min: 465 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return (
    <div className="w-full">
      <div className="my-5">
        {!isEmpty(items) && (
          <>
            <div className="my-8 font-bold text-2xl">Our Top Sales</div>
            <div className="relative">
              <Carousel
                responsive={responsive}
                ssr={true}
                slidesToSlide={1}
                infinite={true}
                arrows={false}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
                className="flex items-center mt-30px p-1 pt-0 -mx-4 px-10"
              >
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </Carousel>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductTopSells;
