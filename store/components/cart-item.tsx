import ImageComponent from '@components/ImageComponent';
import { useSettings } from '@contexts/settings.context';
import { usePrice } from '@hooks/use-price';
import { useAppDispatch } from '@hooks/use-store';
import { decrementItem, incrementItem } from '@redux/card/index';
import { Product, ProductType } from '@ts-types/generated';
import { useRouter } from 'next/router';
import React from 'react';

import Counter from './counter';

type CartItemProps = {
  item: Product;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const router = useRouter();
  const { locale } = router;

  const dispatch = useAppDispatch();
  const {
    currency: { code }
  } = useSettings();

  const {
    thumbnail: { image = '' } = {},
    name,
    type,
    orderVariationOption,
    quantity,
    salePrice
  } = item;

  const price =
    type?.id === ProductType.Variable
      ? orderVariationOption?.salePrice
      : salePrice;

  const unitPrice = usePrice({
    amount: price,
    locale,
    currencyCode: code
  });

  const finalPrice = usePrice({
    amount: price * item.orderQuantity,
    locale,
    currencyCode: code
  });

  const thumbnail =
    type?.id === ProductType.Variable && orderVariationOption?.image
      ? `${process.env.S3_ENDPOINT}/${orderVariationOption?.image}`
      : `${process.env.S3_ENDPOINT}/${image}`;

  const itemQuantityLimit =
    type?.id === ProductType.Simple ? quantity : orderVariationOption?.quantity;

  return (
    <div className="w-full h-auto flex justify-start items-center bg-white py-6 px-30px border-b border-gray-200 relative last:border-b-0">
      <div className="flex w-105px h-105px rounded overflow-hidden bg-gray-200 flex-shrink-0">
        <ImageComponent
          src={thumbnail}
          objectFit="cover"
          width={105}
          height={105}
        />
      </div>
      <div className="flex flex-col w-full px-15px">
        <span className="text-13px text-gray-900 cut-line-1">{name}</span>
        <span className="text-13px text-gray-600 my-5px">
          Unit Price: &nbsp;
          {unitPrice}
        </span>
        {ProductType.Variable && (
          <span className="text-13px text-gray-600 mb-10px">
            Variant: &nbsp;
            <span className="text-gray-900 font-semibold">
              {orderVariationOption?.title}
            </span>
          </span>
        )}

        <div className="flex items-center justify-between">
          <Counter
            value={item.orderQuantity}
            disabled={item.orderQuantity === itemQuantityLimit}
            onIncrement={() => dispatch(incrementItem(item))}
            onDecrement={() => dispatch(decrementItem(item))}
          />
          <span className="font-semibold text-16px text-gray-900 flex-shrink-0">
            {finalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
