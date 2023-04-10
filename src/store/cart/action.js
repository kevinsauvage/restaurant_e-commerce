export const cartActionTypes = {
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
  UPDATE_CART: 'UPDATE_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
};

export const updateCart = (item, quantity) => ({
  item,
  quantity,
  type: cartActionTypes.UPDATE_CART,
});

export const setInitalState = (items) => ({
  items,
  type: cartActionTypes.SET_INITIAL_STATE,
});
