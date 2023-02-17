/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { PhoneIcon } from '@components/icons/phone';
import ImageComponent from '@components/ImageComponent';
import { useSettings } from '@contexts/settings.context';
import ChevronDown from '@store/assets/icons/chevron-down';
import CloseIcon from '@store/assets/icons/close';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from '@store/assets/icons/social-icons';
import ActiveLink from '@store/components/active-link';
import { Scrollbar } from '@store/components/scrollbar';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { Category } from '@ts-types/generated';
import cd from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { useContext, useState } from 'react';

interface TCategory {
  categories: Category[];
}
const menus = [
  {
    id: 4,
    pathname: '/faq',
    title: 'FAQ'
  },
  {
    id: 5,
    pathname: '/terms',
    title: 'Terms & Conditions'
  }
];

const social = [
  {
    id: 'FacebookIcon',
    icon: <Facebook />,
    className: 'facebook',
    title: 'facebook'
  },
  {
    id: 'TwitterIcon',
    icon: <Twitter />,
    className: 'twitter',
    title: 'twitter'
  },
  {
    id: 'YouTubeIcon',
    icon: <Youtube />,
    className: 'youtube',
    title: 'youtube'
  },
  {
    id: 'InstagramIcon',
    icon: <Instagram />,
    className: 'instagram',
    title: 'instagram'
  }
];

interface Props {
  categories: Category[];
}

export default function DrawerMenu({ categories = [] }: Props) {
  const { dispatch } = useContext(DrawerContext);

  const hideMenu = () => {
    dispatch({
      type: 'OPEN_MENU',
      payload: {
        menu: false
      }
    });
  };

  const { storeName, logo, storeNumber, socials } = useSettings();

  console.log({ socials });

  return (
    <>
      <div className="flex flex-col w-full h-full overflow-auto">
        <div className="w-full h-90px bg-gray-100 flex justify-start items-center relative px-30px flex-shrink-0">
          <Link href="/">
            <a className="relative flex" onClick={hideMenu}>
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

          <div className="flex items-center justify-end ml-auto pl-30px pr-50px text-gray-700 flex-shrink-0 lg:hidden">
            <PhoneIcon width="15px" height="15px" />
            <a
              href={`tel:${storeNumber}`}
              className="font-semibold text-base text-14px ml-3"
            >
              {storeNumber}
            </a>
          </div>

          <button
            className="w-30px h-30px flex items-center justify-center text-gray-500 absolute right-25px focus:outline-none"
            onClick={hideMenu}
            aria-label="close"
          >
            <CloseIcon />
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow">
          <div className="flex flex-col py-60px pb-40px lg:pb-60px">
            {categories.map((category) => (
              <CategoryLinkComponent
                key={category.id}
                category={category}
                hideMenu={hideMenu}
              />
            ))}
            {menus.map((menu, index) => (
              <ActiveLink
                href={menu.pathname}
                activeClassName="font-semibold active"
                key={index}
              >
                <a
                  className="hover:bg-gray-200 menu-item relative text-gray-900 pl-30px pr-4 py-4 mb-2 transition duration-300 ease-in-out last:mb-0 hover:text-gray-900"
                  onClick={hideMenu}
                >
                  {menu.title}
                </a>
              </ActiveLink>
            ))}
          </div>
        </Scrollbar>

        <div className="flex items-center justify-start border-t border-gray-300 bg-gray-100 h-12 px-30px flex-shrink-0 lg:hidden">
          {social.map((item, index) => (
            <a
              href={
                (socials?.items ?? [])?.find((x) => x?.icon?.value === item.id)
                  ?.url
              }
              className={`social ${item.className}`}
              target="_blank"
              key={index}
              rel="noreferrer"
            >
              <span className="sr-only">{item.title}</span>
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

const CategoryLinkComponent = ({
  hideMenu,
  category
}: {
  hideMenu: any;
  category: Category;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={cd('flex justify-between items-center border-gray-200', {
          'border-b': !open
        })}
      >
        <ActiveLink
          href={`/category/${category.name}`}
          activeClassName="font-semibold active"
        >
          <a
            className="hover:bg-gray-200 flex-1 menu-item relative text-gray-900 pl-30px pr-4 py-5 transition duration-300 ease-in-out last:mb-0 hover:text-gray-900"
            onClick={hideMenu}
          >
            {category.name}
          </a>
        </ActiveLink>
        {!isEmpty(category.subCategories) && (
          <div
            className="hover:bg-gray-200 border-l p-4 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <ChevronDown width="30px" height="30px" />
          </div>
        )}
      </div>
      {open && (
        <div className="pl-6 flex flex-col border-b border-gray-200">
          {category.subCategories?.map((sub) => {
            return (
              <ActiveLink
                href={`/category/${sub.name}`}
                key={sub.id}
                activeClassName="font-semibold active"
              >
                <a className="hover:bg-gray-200 menu-item relative text-gray-700 pl-30px py-2 hover:text-gray-900">
                  {sub.name}
                </a>
              </ActiveLink>
            );
          })}
        </div>
      )}
    </>
  );
};
