import { useEffect, useState } from 'react';

const useTotalItems = (items) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((accumulator, item) => accumulator + Number(item.quantity), 0));
  }, [items]);

  return total;
};

export default useTotalItems;
