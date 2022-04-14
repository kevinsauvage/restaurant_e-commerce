import { useEffect, useState } from 'react';

const useTotalPrice = (items) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      items.reduce(
        (previousValue, el) =>
          previousValue +
          parseInt(el.product.price, 10) * parseInt(el.quantity, 10),
        0
      )
    );
  }, [items]);

  return total;
};

export default useTotalPrice;
