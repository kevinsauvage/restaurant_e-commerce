import styles from './orderCard.module.scss';

const OrderCard = ({ order }) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <h3>Items</h3>
      <p className={styles.date}>
        {new Date(order.created * 1000).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
    <div>
      {order.items.map((item) => (
        <div key={item.description} className={styles.lineItem}>
          <small>{item.description}</small>
          <p className={styles.quantity}>x {item.quantity}</p>
        </div>
      ))}
    </div>

    <p className={styles.price}>Total price {Number(order?.totalPrice) / 100}€</p>
  </div>
);

export default OrderCard;
