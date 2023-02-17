import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { Category } from '@ts-types/generated';
import React, { useContext } from 'react';

import Cart from './views/cart';
import Checkout from './views/checkout';
import DrawerMenu from './views/menus';

interface Props {
  categories: Category[];
}

export const CartDrawer = () => {
  const { state, dispatch } = useContext(DrawerContext);
  const handleClose = () =>
    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: false
      }
    });

  const drawerComponent = (state) => {
    if (state?.showCart === true) {
      return <Cart />;
    }

    if (state?.showCheckout === true) {
      return <Checkout />;
    }

    return <Cart />;
  };

  return (
    <React.Fragment>
      {state?.open === true ? (
        <div className="overlay" role="button" onClick={handleClose} />
      ) : (
        ''
      )}
      <div
        className={`drawer drawer-cart ${state?.open === true ? 'open' : ''}`}
      >
        {drawerComponent(state)}
      </div>
    </React.Fragment>
  );
};

export const Drawer = ({ categories = [] }: Props) => {
  const { state, dispatch }: any = useContext(DrawerContext);
  const handleClose = () =>
    dispatch({
      type: 'OPEN_MENU',
      payload: {
        menu: false
      }
    });

  return (
    <React.Fragment>
      {state?.menu === true ? (
        <div
          className="overlay overlay-menu"
          role="button"
          onClick={handleClose}
        />
      ) : (
        ''
      )}
      <div
        className={`drawer drawer-menu ${state?.menu === true ? 'open' : ''}`}
      >
        <DrawerMenu categories={categories} />
      </div>
    </React.Fragment>
  );
};
