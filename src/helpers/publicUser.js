const publicUser = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  id: user._id,
  orders: user.orders || [],
});

export default publicUser;
