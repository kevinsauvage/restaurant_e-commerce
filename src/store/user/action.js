export const userActionTypes = {
  ADD_SELECTED_ITEM: 'ADD_SELECTED_ITEM',
  ADD_USER: 'ADD_USER',
};

export const addUser = (user) => ({
  type: userActionTypes.ADD_USER,
  user,
});

export const addSelectedItem = (item) => ({
  item,
  type: userActionTypes.ADD_SELECTED_ITEM,
});
