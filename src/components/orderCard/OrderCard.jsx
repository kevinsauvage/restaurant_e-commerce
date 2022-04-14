import styles from './orderCard.module.scss';

function OrderCard({ order }) {
  return (
    <div className={styles.card}>
      {/* {order.map((item) => (
        <div className={styles.lineItem}>
          <p>{item.description}</p>
          <p>x {item.quantity}</p>
        </div>
      ))} */}
      <p>Total price </p>
    </div>
  );
}

export default OrderCard;
