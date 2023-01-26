export const cartItemsTotalPrice = (items, coupon = null) => {
  let total = items.reduce((price, product) => {
    if (product.salePrice) {
      return price + product.salePrice * product.quantity;
    }
    return price + product.price * product.quantity;
  }, 0);
  const discount = coupon
    ? (total * Number(coupon.discountInPercent)) / 100
    : 0;

  return total - discount;
};
// cartItems, cartItemToAdd
const addItemToCart = (state, action) => {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingCartItemIndex > -1) {
    const newState = [...state.items];
    newState[existingCartItemIndex].quantity += action.payload.quantity;
    return newState;
  }
  return [...state.items, action.payload];
};

// cartItems, cartItemToRemove
const removeItemFromCart = (state, action) => {
  return state.items.reduce((acc, item) => {
    if (item.id === action.payload.id) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
};

const clearItemFromCart = (state, action) => {
  return state.items.filter((item) => item.id !== action.payload.id);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, ...action.payload };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'ADD_ITEM':
      return { ...state, items: addItemToCart(state, action) };
    case 'REMOVE_ITEM':
      return { ...state, items: removeItemFromCart(state, action) };
    case 'CLEAR_ITEM_FROM_CART':
      return { ...state, items: clearItemFromCart(state, action) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
