/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ImageComponent from '@components/ImageComponent';
import { useSettings } from '@contexts/settings.context';
import { useCartItemsCount } from '@hooks/use-store';
import CartIcon from '@store/assets/icons/cart-icon';
import CategoriesSvg from '@store/assets/icons/categories';
import PhoneIcon from '@store/assets/icons/phone';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { StickyContext } from '@store/contexts/sticky/sticky.provider';
import { useMedia } from '@store/helpers/use-media';
import { Category } from '@ts-types/generated';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';

import Menu from './menu';

interface Props {
  categories: Category[];
}

export default function Header({ categories }: Props) {
  const isLargeScreen = useMedia('(min-width: 1024px)');
  const { dispatch } = useContext(DrawerContext);

  const [renderCategory, setRenderCategory] = useState(false);

  const {
    state: { isSticky }
  } = useContext(StickyContext);

  useEffect(() => {
    setRenderCategory(isLargeScreen);
  }, [isLargeScreen]);

  const itemsCount = useCartItemsCount();
  const searchRef = useRef(null);

  useEffect(() => {
    if (isLargeScreen && isSticky && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSticky, isLargeScreen]);

  const showMenu = () => {
    dispatch({
      type: 'OPEN_MENU',
      payload: {
        menu: true
      }
    });
  };

  const showCart = () => {
    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: true
      }
    });
    dispatch({
      type: 'TOGGLE_CART_VIEW',
      payload: {
        showCart: true
      }
    });
  };

  const categoryLimit = 5;
  const selectedCategories = categories?.slice(0, categoryLimit);

  const { storeName, logo, storeNumber } = useSettings();

  return (
    <header className="flex items-center justify-between shadow-mobile text-gray-700 body-font fixed bg-white w-full h-60px z-20 lg:shadow-header pr-20px md:pr-30px lg:pr-40px">
      {/* MENU SECTION */}
      <div className="flex items-center justify-center">
        <button
          aria-label="Menu"
          className="menuBtn flex flex-col items-center justify-center w-50px flex-shrink-0 h-full outline-none focus:outline-none lg:w-90px"
          onClick={showMenu}
        >
          <span className="menuIcon">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </span>
        </button>

        <Link href="/">
          <a className="relative hidden mx-auto lg:mr-10 lg:flex">
            <span className="sr-only">{storeName}</span>
            <div className="w-[31px] h-[31px]">
              <ImageComponent
                src={`${process.env.S3_ENDPOINT}/${logo?.image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </a>
        </Link>
      </div>

      {/* CATEGORIES SECTION */}
      {renderCategory && (
        <div className="flex flex-1 h-full">
          {selectedCategories?.map((category) => {
            return <Menu key={category.id} category={category} />;
          })}
          <div>
            {categories?.length > categoryLimit && (
              <div
                onClick={showMenu}
                role="button"
                className="flex justify-center items-center mx-1 p-1 px-2 h-full cursor-pointer hover:bg-gray-100"
              >
                <CategoriesSvg />
                <div className="font-semibold text-gray-800 px-2">
                  All Categories
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* CART SECTION */}
      <div className="flex justify-center items-center">
        <div className="hidden items-center text-gray-900 mr-10 flex-shrink-0 lg:flex">
          <PhoneIcon />
          <a
            href={`tel:${storeNumber}`}
            className="font-semibold text-base text-14px ml-3"
          >
            {storeNumber}
          </a>
        </div>

        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          onClick={showCart}
          aria-label="cart-button"
        >
          <CartIcon width="20px" height="22px" />
          <span
            className="w-18px h-18px flex items-center justify-center bg-gray-900 text-white absolute rounded-full font-semibold"
            style={{ fontSize: '12px', top: '-10px', right: '-10px' }}
          >
            {itemsCount}
          </span>
        </button>
      </div>
    </header>
  );
}
