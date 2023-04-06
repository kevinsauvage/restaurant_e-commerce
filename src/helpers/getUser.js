import apiHelper from './apiHelper';

const getUser = async (email) => {
  const response = await apiHelper(`/api/user?email=${email}`, undefined, 'GET');
  if (response.success) return response.user;
  return false;
};

export default getUser;
