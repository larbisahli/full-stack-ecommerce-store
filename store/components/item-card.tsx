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

interface ItemProps {
  image: string;
  name: string;
  price: number;
  type: string;
  quantity: number;
}

interface ItemCardProps {
  item: ItemProps;
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
          <img
            className="object-cover"
            src={item.image}
            alt={' Alt ' + item.name}
          />
        </div>

        <div className={ItemCardContent}>
          <span className={ItemCardPrice}>
            {CURRENCY}
            {item.price}
          </span>
          <span className={ItemCardName}>{item.name}</span>

          <div className={ItemCardInformation}>
            <span className={ItemCardType}>{item.type}</span>
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
