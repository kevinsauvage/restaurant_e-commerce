import { useEffect, useState } from 'react';

const useTotalPrice = (items) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      items.reduce(
        (previousValue, el) =>
          previousValue + Number(el.product.price) * Number(el.quantity),
        0
      )
    );
  }, [items]);

  return total;
};

export default useTotalPrice;
