export const cartActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
};

export const addItem = (newItem) => ({
  type: cartActionTypes.ADD_ITEM,
  item: newItem,
});

export const removeItem = (item) => ({
  type: cartActionTypes.REMOVE_ITEM,
  item,
});

export const setInitalState = (items) => ({
  type: cartActionTypes.SET_INITIAL_STATE,
  items,
});
