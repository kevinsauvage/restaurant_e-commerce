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
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
};

export default apiHelper;
