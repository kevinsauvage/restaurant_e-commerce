export const getItem = (key) => {
  if (typeof window === 'undefined') return;
  const itemString = localStorage.getItem(key);
  if (!itemString) return;

  const item = JSON.parse(itemString);

  if (item.expiry) {
    const now = Date.now();

    const isNotValid = Math.floor(now) > Math.floor(item.expiry);

    if (isNotValid) {
      localStorage.removeItem(key);
      return;
    }
    return item.value;
  }
  return item.value;
};

export const setItem = (key, value, ttl) => {
  const item = { value };

  if (ttl) {
    const expiryTime = Date.now() + ttl * 1000;
    item.expiry = expiryTime;
  }

  return localStorage.setItem(key, JSON.stringify(item));
};
