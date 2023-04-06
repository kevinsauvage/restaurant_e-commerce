import { useEffect, useState } from 'react';

const useTotalPrice = (items) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      items.reduce(
        (previousValue, element) =>
          previousValue +
          Number(element.product.price.replace(',', '.')) * Number(element.quantity),
        0
      )
    );
  }, [items]);

  return total.toFixed(2);
};

export default useTotalPrice;
