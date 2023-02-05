import { useSettings } from '@contexts/settings.context';
import { usePrice } from '@hooks/use-price';
import { useAppSelector, UseCartItemsTotalPrice } from '@hooks/use-store';
import ArrowLeft from '@store/assets/icons/arrow-left';
import Button from '@store/components/button';
import CartItem from '@store/components/cart-item';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import NoItem from './no-item';

export default function Cart() {
  const { dispatch } = useContext(DrawerContext);
  const router = useRouter();
  const { locale } = router;

  const {
    currency: { currencyCode }
  } = useSettings();

  const items = useAppSelector((state) => state.cart.items);

  console.log({ items });

  const showCheckout = () => {
    dispatch({
      type: 'TOGGLE_CHECKOUT_VIEW',
      payload: {
        showCheckout: true
      }
    });
  };

  const hideCart = () => {
    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: false
      }
    });
  };

  const totalPrice = usePrice({
    amount: UseCartItemsTotalPrice(),
    locale,
    currencyCode
  });

  return (
    <div className="flex flex-col w-full h-full">
      {items.length ? (
        <>
          <div className="w-full flex justify-center flex-shrink-0 relative px-30px py-20px border-b border-gray-200">
            <button
              className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
              onClick={hideCart}
              aria-label="close"
            >
              <ArrowLeft />
            </button>

            <h2 className="font-bold text-24px m-0">Your Basket</h2>
          </div>

          <div className="overflow-y-auto flex-grow">
            {items.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </>
      ) : (
        <NoItem />
      )}

      <div className="flex flex-col flex-shrink-0 p-30px">
        <div className="flex items-center justify-between mb-20px">
          <span className="font-semibold text-gray-900">
            Subtotal &nbsp;
            <span className="font-normal text-gray-700 text-13px">
              (Incl. VAT)
            </span>
          </span>

          <span className="font-semibold text-18px text-gray-900">
            {totalPrice}
          </span>
        </div>

        <Button
          className="big flex-shrink-0"
          disabled={!items.length ? true : false}
          onClick={showCheckout}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
