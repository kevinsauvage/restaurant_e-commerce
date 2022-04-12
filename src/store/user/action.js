export const userActionTypes = {
  ADD_USER: 'ADD_USER',
};

export const addItem = (user) => ({
  type: userActionTypes.ADD_USER,
  user,
});
