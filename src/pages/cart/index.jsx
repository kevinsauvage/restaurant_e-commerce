import { useSelector } from 'react-redux';

import Button from '../../components/Button/Button';
import CardItems from '../../components/CardItem/CardItems';
import Cart from '../../components/Cart/Cart';
import Page from '../../layout/Page/Page';

import styles from './cart.module.scss';

const Order = () => {
  const { cart } = useSelector((state) => state);

  return (
    <Page title="Order">
      <div className={styles.container}>
        <div className={styles.cart}>
          <h1 className={styles.title}>My Cart</h1>
          {cart.items.length > 0 && (
            <div className={styles.items}>
              {cart.items.map((item) => (
                <CardItems key={item.product.name} item={item.product} quantity={item.quantity} />
              ))}
            </div>
          )}
        </div>
        {cart.items.length > 0 && <Cart />}
      </div>

      {cart.items.length <= 0 && (
        <div className={styles.noItems}>
          <p className={styles.noItemsTitle}>The cart is empty</p>
          <Button href="/" text="ADD ITEMS" />
        </div>
      )}
    </Page>
  );
};

export default Order;
