import { useEffect, useState } from 'react';
import apiHelper from '../../helpers/apiHelper';
import styles from './orderCard.module.scss';

function OrderCard({ orderId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await apiHelper(
        `/api/checkout_sessions/${orderId}`,
        null,
        'GET'
      );
      if (res && res.items?.data) setItems(res.items.data);
    };
    getItems();
  }, []);

  return (
    <div className={styles.card}>
      {items.map((item) => (
        <div className={styles.lineItem}>
          <p>{item.description}</p>
          <p>x {item.quantity}</p>
        </div>
      ))}
      <p>Total price </p>
    </div>
  );
}

export default OrderCard;
