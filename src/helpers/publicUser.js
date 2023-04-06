const publicUser = (user) => ({
  email: user.email,
  firstName: user.firstName,
  id: user._id,
  lastName: user.lastName,
  orders: user.orders || [],
});

export default publicUser;
