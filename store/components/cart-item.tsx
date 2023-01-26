import { useCart } from '@store/contexts/cart/cart.provider';
import { CURRENCY } from '@store/helpers/constants';

import Counter from './counter';
import {
  CartItemBase,
  CartItemContent,
  CartItemImage,
  CartItemName,
  CartItemSinglePrice,
  CartItemTotalPrice,
  CartItemTotalWrapper
} from './utils/theme';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { addItem, removeItem } = useCart();

  return (
    <div className={CartItemBase}>
      <div className={CartItemImage}>
        <img src={item.image} alt={item.name} />
      </div>

      <div className={CartItemContent}>
        <span className={CartItemName}>{item.name}</span>
        <span className={CartItemSinglePrice}>
          Unit Price &nbsp;
          {CURRENCY}
          {item.price}
        </span>

        <div className={CartItemTotalWrapper}>
          <Counter
            value={item.quantity}
            onIncrement={() => addItem(item)}
            onDecrement={() => removeItem(item)}
          />

          <span className={CartItemTotalPrice}>
            {CURRENCY}
            {(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
