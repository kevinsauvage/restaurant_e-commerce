import { store } from '../store/store';
import { addUser } from '../store/user/action';
import { setItem } from './localStorage';

const apiHelper = async (url, data = {}, method = 'POST') => {
  const object = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) object.body = JSON.stringify(data);

  try {
    const res = await fetch(url, object);
    if (Number(res.status) === 401) {
      store.dispatch(addUser({}));
      setItem('user', null);
      await apiHelper('/api/logout');
      window.location.pathname = '/login';
      return false;
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
};

export default apiHelper;
