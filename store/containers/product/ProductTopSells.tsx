/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import 'react-multi-carousel/lib/styles.css';

import ChevronLeft from '@store/assets/icons/chevron-left';
import ChevronRight from '@store/assets/icons/chevron-right';
import ItemCard from '@store/components/item-card';
import { Category } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import Carousel from 'react-multi-carousel';

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
      className="w-40px h-40px  shadow-xl text-gray-800 rounded-full bg-white p-1 ml-2 flex items-center justify-center absolute left-0 focus:outline-none"
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
      className="w-40px h-40px shadow-xl text-gray-800 rounded-full mr-2 bg-white flex items-center justify-center absolute right-0 focus:outline-none"
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
      breakpoint: { max: 860, min: 500 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1
    }
  };

  return (
    <div className="w-full">
      <div className="my-5 overflow-auto">
        {!isEmpty(items) && (
          <>
            <div className="my-8 text-xl sm:text-2xl font-bold">
              Our Top Sales
            </div>
            <div className="relative overflow-hidden">
              <Carousel
                responsive={responsive}
                ssr={true}
                slidesToSlide={1}
                infinite={true}
                arrows={false}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
                className="flex items-center mt-30px p-1 pt-0"
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
