import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Category } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { forwardRef, memo } from 'react';

const MyLink = forwardRef((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

MyLink.displayName = 'MyLink';

interface Props {
  category: Category;
}

const Menu = ({ category }: Props) => {
  console.log('MENU', { category });
  return (
    <div
      key={category.id}
      className="flex justify-center items-center mx-1 p-1 px-2 cursor-pointer hover:bg-gray-100"
    >
      {isEmpty(category?.subCategories) ? (
        <MyLink href="/profile">
          <p className="font-semibold text-gray-800">{category.name}</p>
        </MyLink>
      ) : (
        <HeadlessMenu>
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
            <HeadlessMenu.Items className="bg-purple-700 absolute right-0 py-3 px-5">
              {category?.subCategories?.map((sub) => (
                <HeadlessMenu.Item
                  as="a"
                  key={`/${sub.name}`}
                  href={sub.name}
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                  <MyLink href="/profile">{sub.name}</MyLink>
                </HeadlessMenu.Item>
              ))}
            </HeadlessMenu.Items>
          </Transition>
        </HeadlessMenu>
      )}
    </div>
  );
};

export default memo(Menu);
