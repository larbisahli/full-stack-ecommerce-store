import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import ActiveLink from '@store/components/active-link';
import { Category } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { memo } from 'react';

interface Props {
  category: Category;
}

const Menu = ({ category }: Props) => {
  return (
    <div
      key={category.id}
      className="flex justify-center items-center mx-1 p-1 px-2 cursor-pointer hover:bg-gray-100"
    >
      <ActiveLink
        href={`/category/${category.name}`}
        activeClassName="text-green-500 bg-gray-100"
      >
        <a>
          <div className="font-semibold text-gray-800">{category.name}</div>
        </a>
      </ActiveLink>
      {/* {isEmpty(category?.subCategories) ? (
        <ActiveLink
          href={`/category/${category.name}`}
          activeClassName="text-green-500 bg-gray-100"
        >
          <a>
            <div className="font-semibold text-gray-800">{category.name}</div>
          </a>
        </ActiveLink>
      ) : (
        <HeadlessMenu>
          <div className="relative">
            <HeadlessMenu.Button>
              <p className="font-semibold text-gray-800">{category.name}</p>
            </HeadlessMenu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <HeadlessMenu.Items
                style={{ transform: 'translateX(-20%)' }}
                className="z-10 absolute top-0 left-0 mt-3 bg-white divide-y divide-gray-100 rounded shadow-lg border border-solid border-gray-200 w-44 dark:bg-gray-700"
              >
                {category?.subCategories?.map((sub) => (
                  <HeadlessMenu.Item
                    as="a"
                    key={`/${sub.name}`}
                    href={sub.name}
                    className="block px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <ActiveLink
                      href={`/category/${sub.name}`}
                      activeClassName="text-green-500 bg-gray-100"
                    >
                      <a>
                        <div className="font-semibold text-gray-700">
                          {sub.name}
                        </div>
                      </a>
                    </ActiveLink>
                  </HeadlessMenu.Item>
                ))}
              </HeadlessMenu.Items>
            </Transition>
          </div>
        </HeadlessMenu>
      )} */}
    </div>
  );
};

export default memo(Menu);
