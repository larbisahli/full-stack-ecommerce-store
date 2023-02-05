import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductType } from '@ts-types/generated';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import { nanoid } from 'nanoid';

export interface CartState {
  isOpen: boolean;
  items: Product[];
}

const initialState: CartState = {
  isOpen: false,
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<Product>) => {
      const { orderQuantity, ...rest } = action.payload;

      state.items.push({
        ...rest,
        key: nanoid(),
        orderQuantity: orderQuantity ?? 1
      });
    },
    removeItem: (state: CartState, action: PayloadAction<Product>) => {
      const key = action.payload.key;
      state.items = filter(state.items, (item: Product) => item.key !== key);
    },
    incrementItem: (state: CartState, action: PayloadAction<Product>) => {
      const { key, type, quantity, orderVariationOption } = action.payload;
      const itemQuantityLimit =
        type?.id === ProductType.Simple
          ? quantity
          : orderVariationOption?.quantity;
      state.items = state?.items?.map((item) => {
        if (item.key === key && item.orderQuantity < itemQuantityLimit) {
          item.orderQuantity += 1;
        }
        return item;
      });
    },
    decrementItem: (state: CartState, action: PayloadAction<Product>) => {
      const key = action.payload.key;
      const item = state?.items?.find((item: Product) => item.key === key);
      if (item?.orderQuantity > 1) {
        state.items = state?.items?.map((item) => {
          if (item.key === key) {
            item.orderQuantity -= 1;
          }
          return item;
        });
      } else {
        state.items = filter(state.items, (item: Product) => item.key !== key);
      }
    },
    clearCart: (state: CartState) => {
      state.items = [];
    },
    rehydrate: (state: CartState, action: PayloadAction<Product[]>) => {
      if (isArray(action.payload)) {
        state.items = action.payload;
      } else {
        state.items = [];
      }
    }
  }
});

export const {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  rehydrate,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
