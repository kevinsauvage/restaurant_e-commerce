import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import apiHelper from '../../helpers/apiHelper';
import useTotalPrice from '../../hooks/useTotalPrice';
import getStripe from '../../utils/get-stripe';
import Button from '../Button/Button';

import styles from './Cart.module.scss';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const total = useTotalPrice(items);

  const { pathname, push } = useRouter();

  const redirectToCheckout = async () => {
    if (!user) return push('/login');

    const response = await apiHelper('/api/checkout_sessions', { items, user });
    if (!response || !response.id) return;
    const stripe = await getStripe();
    return stripe.redirectToCheckout({ sessionId: response.id });
  };
  return (
    <div className={styles.Cart}>
      <div className={styles.header}>
        <p className={styles.title}>Cart Summary</p>
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

      {pathname?.startsWith('/cart') && items?.length > 0 ? (
        <Button text="CONFIRM ORDER" onClick={redirectToCheckout} />
      ) : (
        <Button href="/cart" text="Visit Cart" />
      )}
    </div>
  );
};

export default Cart;
