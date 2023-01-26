import ArrowLeft from '@store/assets/icons/arrow-left';
import Button from '@store/components/button';
import Input from '@store/components/input';
import { Scrollbar } from '@store/components/scrollbar';
import Textarea from '@store/components/textarea';
import {
  InputBase,
  TextBoxCommonBase,
  TextBoxEnable
} from '@store/components/utils/theme';
import { useCart } from '@store/contexts/cart/cart.provider';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';

import OrderSubmit from './order-submit';
const initialState = {
  phone_number: '',
  name: '',
  address: '',
  postal_code: '',
  suite: ''
};

export default function Checkout() {
  const { dispatch } = useContext(DrawerContext);
  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { items, calculatePrice, clearCart } = useCart();

  const hideCheckout = () => {
    dispatch({
      type: 'TOGGLE_CHECKOUT_VIEW',
      payload: {
        showCheckout: false
      }
    });
  };

  const submitOrder = async () => {
    const { name, address, postal_code, suite, phone_number } = formData;
    if (!phone_number.trim()) {
      setError({
        field: 'phone_number',
        message: 'Phone number is required'
      });
      return;
    }

    setLoading(true);

    const res = await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({
        items: items
          .map((item) => `${item.name} - ${item.quantity}`)
          .toString(),
        address: `${name} ${address} ${postal_code} ${suite}`,
        phone_number: phone_number,
        email: 'email@email.com',
        bill_amount: calculatePrice()
      })
    });
    if (res.status === 200) {
      setSuccess(true);
      clearCart();
      setLoading(false);
    } else {
      setError(true);
    }
  };

  const onChange = (e) => {
    const { value, name } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  if (success) {
    return <OrderSubmit />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideCheckout}
          aria-label="close"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-bold text-24px m-0">Checkout</h2>
      </div>

      <Scrollbar className="checkout-scrollbar flex-grow">
        <div className="flex flex-col px-30px pt-20px">
          <div className="flex flex-col mb-45px">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Contact Information
            </span>
            <NumberFormat
              format="+1 (###) ###-####"
              mask="_"
              placeholder="Mobile Phone Number"
              className={`${InputBase} ${TextBoxCommonBase} ${TextBoxEnable}`}
              value={formData.phone_number}
              onValueChange={({ value }) =>
                setFormData({
                  ...formData,
                  phone_number: value
                })
              }
            />
            {error?.field === 'phone_number' && (
              <p className="text-12px font-semibold text-error pt-10px pl-15px">
                {error.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Shipping Address
            </span>
            <Input
              placeholder="Name"
              className="mb-10px"
              name="name"
              value={formData.name}
              onChange={onChange}
            />

            <Textarea
              placeholder="Enter Address"
              className="mb-10px"
              name="address"
              value={formData.address}
              onChange={onChange}
            ></Textarea>

            <div className="flex items-center mb-10px">
              <Input
                placeholder="Postal Code"
                style={{ width: 'calc(50% - 5px)', marginRight: '5px' }}
                name="postal_code"
                value={formData.postal_code}
                onChange={onChange}
              />
              <Input
                placeholder="Apartment, Suite, etc."
                style={{ width: 'calc(50% - 5px)', marginLeft: '5px' }}
                name="suite"
                value={formData.suite}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </Scrollbar>

      <div className="flex flex-col p-30px">
        <Button className="big w-full" onClick={submitOrder} loading={loading}>
          Order Now
        </Button>
      </div>
    </div>
  );
}
