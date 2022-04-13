export const userActionTypes = {
  ADD_USER: 'ADD_USER',
};

export const addUser = (user) => ({
  type: userActionTypes.ADD_USER,
  user,
});
