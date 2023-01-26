import React, { createContext, useReducer } from 'react';
export const DrawerContext = createContext<{
  state?: any;
  dispatch?: React.Dispatch<any>;
}>({});

const INITIAL_STATE = {
  showDetails: false,
  showCart: false,
  showCheckout: false,
  menu: false,
  open: false,
  item: []
};

type ActionType =
  | { type: 'STORE_PRODUCT_DETAIL'; payload: any }
  | { type: 'TOGGLE_PRODUCT_DETAIL'; payload: any }
  | { type: 'TOGGLE_CART_VIEW'; payload: any }
  | { type: 'TOGGLE_CHECKOUT_VIEW'; payload: any }
  | { type: 'SLIDE_CART'; payload: any }
  | { type: 'OPEN_MENU'; payload: any };

type StateType = typeof INITIAL_STATE;

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'STORE_PRODUCT_DETAIL':
      return {
        ...state,
        item: action.payload.item
      };
    case 'TOGGLE_PRODUCT_DETAIL':
      return {
        ...state,
        showDetails: action.payload.showDetails,
        showCart: false,
        showCheckout: false
      };
    case 'TOGGLE_CART_VIEW':
      return {
        ...state,
        showDetails: false,
        showCart: action.payload.showCart,
        showCheckout: false
      };
    case 'TOGGLE_CHECKOUT_VIEW':
      return {
        ...state,
        showDetails: false,
        showCart: false,
        showCheckout: action.payload.showCheckout
      };
    case 'SLIDE_CART':
      return {
        ...state,
        open: action.payload.open
      };
    case 'OPEN_MENU':
      return {
        ...state,
        menu: action.payload.menu
      };
    default:
      return state;
  }
}

export const DrawerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <DrawerContext.Provider value={{ state, dispatch }}>
      {children}
    </DrawerContext.Provider>
  );
};
