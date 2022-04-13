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
      window.location.pathname = '/login';
      return false;
      // need to handle logout
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
};

export default apiHelper;
