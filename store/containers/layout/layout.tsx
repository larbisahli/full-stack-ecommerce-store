import { useAppDispatch, useAppSelector } from '@hooks/use-store';
import { useStorage } from '@hooks/useStorage';
import { rehydrate } from '@redux/card';
import { Product } from '@ts-types/generated';

import { CartDrawer, Drawer } from '../drawer/drawer';
import Footer from './footer';
import Header from './header';

const Layout = (props) => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const rehydrateLocalState = (items: Product[]) => {
    dispatch(rehydrate(items));
  };

  // This component is global on all pages we are using it to get the items in local storage
  useStorage(items, rehydrateLocalState);
  return (
    <main
      className="relative min-h-screen h-screen flex-grow overflow-y-auto"
      style={{
        minHeight: '-webkit-fill-available',
        WebkitOverflowScrolling: 'touch',
        ...props.style
      }}
    >
      <Drawer categories={props.categories} />
      <Header categories={props.categories} />
      <div className="flex flex-col w-full h-full flex-grow">
        <div className="pt-60px flex-auto">{props.children}</div>
        <Footer />
      </div>
      <CartDrawer />
    </main>
  );
};
export default Layout;
