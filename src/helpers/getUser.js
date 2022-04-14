import apiHelper from './apiHelper';

const getUser = async (email) => {
  const res = await apiHelper(`/api/user?email=${email}`, null, 'GET');
  if (res.success) return res.user;
  return false;
};

export default getUser;
