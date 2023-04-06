import { useSelector } from 'react-redux';

import useTotalPrice from '../../hooks/useTotalPrice';
import Button from '../Button/Button';

import styles from './Cart.module.scss';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const total = useTotalPrice(items);

  return (
    <div className={styles.Cart}>
      <div className={styles.header}>
        <p className={styles.title}>MY CART</p>
        <p>{total} €</p>
      </div>
      <div className={styles.items}>
        {items?.map((element) => (
          <div key={element.product.name} className={styles.item}>
            <p>{element.product.name}</p>
            <p className={styles.itemQuantity}>x {element.quantity}</p>
          </div>
        ))}
      </div>

      <Button href="/order" text="ORDER" />
    </div>
  );
};

export default Cart;
