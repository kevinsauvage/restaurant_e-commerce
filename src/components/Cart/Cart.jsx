import { useSelector } from 'react-redux';
import useTotalPrice from '../../hooks/useTotalPrice';
import Button from '../Button/Button';
import styles from './Cart.module.scss';

function Cart() {
  const { items } = useSelector((state) => state.cart);

  const total = useTotalPrice(items);

  return (
    <div className={styles.Cart}>
      <div className={styles.header}>
        <p className={styles.title}>MY CART</p>
        <p>{total} €</p>
      </div>
      <div className={styles.items}>
        {items &&
          items.map((el) => (
            <div key={el.product.name} className={styles.item}>
              <p className={styles.itemName}>{el.product.name}</p>
              <p className={styles.itemQuantity}>x {el.quantity}</p>
            </div>
          ))}
      </div>

      <Button href="/order" text="ORDER" style={styles.btn} />
    </div>
  );
}

export default Cart;
