import type { AppDispatch, AppState } from '@redux/index';
import { Product, ProductType } from '@ts-types/generated';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useCartItemsCount = () => {
  const items = useAppSelector((state) => state.cart.items);
  const itemsCount = useMemo(
    () =>
      items?.reduce((acc, item) => {
        return acc + item?.orderQuantity;
      }, 0),
    [items]
  );
  return itemsCount;
};

export const useIsInCart = (id: string) => {
  const items = useAppSelector((state) => state.cart.items);
  const inCart = useMemo(
    () => items?.some((item: Product) => item.id === id),
    [items, id]
  );
  return inCart;
};

export const useGetItem = (id: string) => {
  const items = useAppSelector((state) => state.cart.items);
  const item = useMemo(
    () => items?.find((item: Product) => item.id === id),
    [items, id]
  );
  return item;
};

export const useGetItems = (id: string) => {
  const items = useAppSelector((state) => state.cart.items);
  const item = useMemo(
    () => items?.filter((item: Product) => item.id === id),
    [items, id]
  );
  return item;
};

export const UseCartItemsTotalPrice = () => {
  const cart = useAppSelector((state) => state.cart);

  const cartItemsTotalPrice = (items: Product[], coupon = null) => {
    let total = items.reduce((salePrice: number, product: Product) => {
      const isVariableType = product.type.id === ProductType.Variable;
      const selectedPrice = isVariableType
        ? product?.orderVariationOption?.salePrice
        : product.salePrice;
      return salePrice + selectedPrice * product.orderQuantity;
    }, 0);

    const discount = coupon
      ? (total * Number(coupon.discountInPercent)) / 100
      : 0;

    return total - discount;
  };

  const itemCount = useMemo(
    () => Number(cartItemsTotalPrice(cart.items, cart.coupon).toFixed(2)),
    [cart]
  );
  return itemCount;
};
