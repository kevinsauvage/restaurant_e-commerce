export const cartActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
};

export const addItem = (newItem, quantity) => ({
  item: newItem,
  quantity,
  type: cartActionTypes.ADD_ITEM,
});

export const removeItem = (item) => ({
  item,
  type: cartActionTypes.REMOVE_ITEM,
});

export const setInitalState = (items) => ({
  items,
  type: cartActionTypes.SET_INITIAL_STATE,
});
