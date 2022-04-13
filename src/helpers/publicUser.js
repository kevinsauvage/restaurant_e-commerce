const publicUser = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  orders: user.orders || [],
});

export default publicUser;
