import ImageComponent from '@components/ImageComponent';
import { siteSettings } from '@settings/site.settings';
import { Product } from '@ts-types/generated';
import React from 'react';

import { CURRENCY } from '../helpers/constants';
import CounterAlt from './animated-counter';
import {
  ItemCardBase,
  ItemCardBaseContent,
  ItemCardContent,
  ItemCardCounterWrapper,
  ItemCardDetailsButton,
  ItemCardImage,
  ItemCardInformation,
  ItemCardName,
  ItemCardPrice,
  ItemCardQuantity,
  ItemCardRoundedDot,
  ItemCardType
} from './utils/theme';
interface ItemCardProps {
  item: Product;
  value: number;
  onClick?: (e: any) => void;
  onDecrement?: (e: any) => void;
  onIncrement?: (e: any) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onClick,
  onDecrement,
  onIncrement,
  value
}) => {
  const baseClassName = ItemCardBase + ' ' + (value ? 'shadow-cart' : '');
  return (
    <div className={baseClassName}>
      <div className={ItemCardBaseContent}>
        <div className={ItemCardImage}>
          <ImageComponent
            src={
              `${process.env.S3_ENDPOINT}/${item.thumbnail}` ??
              siteSettings.product.image
            }
            layout="fill"
            objectFit="contain"
            alt={' Alt ' + item.name}
          />
        </div>

        <div className={ItemCardContent}>
          <span className={ItemCardPrice}>
            {CURRENCY}
            {/* {item.price} */}
          </span>
          <span className={ItemCardName}>{item.name}</span>

          <div className={ItemCardInformation}>
            {/* <span className={ItemCardType}>{item.type}</span> */}
            <span className={ItemCardRoundedDot} />
            <span className={ItemCardQuantity}>{item.quantity} Pieces</span>
          </div>

          <button className={ItemCardDetailsButton} onClick={onClick}>
            Details
          </button>

          <div className={ItemCardCounterWrapper}>
            <CounterAlt
              value={value}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
