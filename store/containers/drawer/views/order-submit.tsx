import ArrowLeft from '@store/assets/icons/arrow-left';
import SuccessIcon from '@store/assets/icons/success-tick';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { useContext, useState } from 'react';

export default function OrderSubmit() {
  const { dispatch } = useContext(DrawerContext);
  const hideCart = () => {
    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: false
      }
    });
  };

  return (
    <>
      <div className="w-full flex px-30px relative">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideCart}
          aria-label="close"
        >
          <ArrowLeft />
        </button>
      </div>

      <div className="flex flex-col pb-60px flex-auto justify-center">
        <div className="flex items-center justify-center text-green">
          <SuccessIcon style={{ width: 60 }} />
        </div>

        <div className="flex flex-col items-center px-40px md:px-80px mt-15px">
          <h2 className="text-center text-18px font-semibold text-gray-900 mb-40px">
            Order Confirmation
          </h2>
          <p className="text-center text-14px font-semibold text-gray-900 mb-1">
            Thank you for your order.
          </p>
          <p className="text-center text-13px text-gray-700">
            We've received your order and will contact you very soon.
          </p>
        </div>
      </div>
    </>
  );
}
