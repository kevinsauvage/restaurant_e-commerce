import styles from './orderCard.module.scss';

function OrderCard({ order }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Items</h3>
        <p className={styles.date}>
          {new Date(order.created * 1000).toLocaleString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
      <div>
        {order.items.map((item) => (
          <div key={item.description} className={styles.lineItem}>
            <p>{item.description}</p>
            <p>x {item.quantity}</p>
          </div>
        ))}
      </div>

      <p className={styles.price}>
        Total price {Number(order?.totalPrice) / 100}€
      </p>
    </div>
  );
}

export default OrderCard;
