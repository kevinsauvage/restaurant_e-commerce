const apiHelper = async (url, data = {}, method = 'POST') => {
  const object = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  };

  if (data) object.body = JSON.stringify(data);

  try {
    const response = await fetch(url, object);

    return await response.json();
  } catch (error) {
    return error;
  }
};

export default apiHelper;
