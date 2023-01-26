import { useErrorLogger } from '@hooks/useErrorLogger';
import CartIcon from '@store/assets/icons/cart-icon';
import Logo from '@store/assets/icons/logo';
import PhoneIcon from '@store/assets/icons/phone';
import Search from '@store/components/search-outline';
import { useCart } from '@store/contexts/cart/cart.provider';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { StickyContext } from '@store/contexts/sticky/sticky.provider';
import { useMedia } from '@store/helpers/use-media';
import { Category } from '@ts-types/generated';
import { fetcher } from '@utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';
import useSwr from 'swr';

import Menu from './menu';

interface TCategory {
  categories: Category[];
}

export default function Header() {
  const router = useRouter();

  const { data, error, isLoading } = useSwr<TCategory>(
    `/api/store/category/categories`,
    fetcher
  );

  const { categories = [] } = data ?? {};

  console.log({ categories });

  useErrorLogger(error);

  const isLargeScreen = useMedia('(min-width: 1024px)');
  const { dispatch } = useContext(DrawerContext);

  const {
    state: { isSticky }
  } = useContext(StickyContext);

  const { itemsCount } = useCart();
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

  const isHome = router.pathname === '/';

  return (
    <header className="flex items-center shadow-mobile text-gray-700 body-font fixed bg-white w-full h-60px z-20 lg:shadow-header pr-20px md:pr-30px lg:pr-40px">
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
          <a className="hidden mx-auto lg:mr-10 lg:flex">
            <span className="sr-only">Logo</span>
            <Logo width="110px" id="header-logo" />
          </a>
        </Link>
      </div>

      {/* <div
        className={`w-full ml-10px mr-20px lg:mr-10 lg:ml-auto transition duration-350 ease-in-out flex justify-center ${
          isSticky ? 'lg:opacity-100 lg:visible' : 'lg:opacity-0 lg:invisible'
        }`}
      >
        {isHome && <Search ref={searchRef} className="search-outline" />}
      </div> */}

      <div className="flex flex-1 h-full">
        {categories?.map((category) => {
          return <Menu key={category.id} category={category} />;
        })}
      </div>

      <div className="flex justify-center items-center">
        <div className="hidden items-center text-gray-900 mr-10 flex-shrink-0 lg:flex">
          <PhoneIcon />
          <span className="font-semibold text-base text-14px ml-3">
            +1 855-766-5885
          </span>
        </div>

        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          onClick={showCart}
          aria-label="cart-button"
        >
          <CartIcon width="20px" height="22px" />
          <span
            className="w-18px h-18px flex items-center justify-center bg-gray-900 text-white absolute rounded-full"
            style={{ fontSize: '10px', top: '-10px', right: '-10px' }}
          >
            {itemsCount}
          </span>
        </button>
      </div>
    </header>
  );
}
