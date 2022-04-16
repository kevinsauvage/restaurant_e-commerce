export const userActionTypes = {
  ADD_USER: 'ADD_USER',
  ADD_SELECTED_ITEM: 'ADD_SELECTED_ITEM',
};

export const addUser = (user) => ({
  type: userActionTypes.ADD_USER,
  user,
});

export const addSelectedItem = (item) => ({
  type: userActionTypes.ADD_SELECTED_ITEM,
  item,
});
