import { useSelector } from 'react-redux';
import axios from 'axios';
import useTotalPrice from '../../hooks/useTotalPrice';
import Page from '../../layout/Page/Page';
import styles from './order.module.scss';
import CardItems from '../../components/CardItem/CardItems';
import Button from '../../components/Button/Button';
import getStripe from '../../utils/get-stripe';

function Order() {
  const { items } = useSelector((state) => state.cart);
  const total = useTotalPrice(items);

  const redirectToCheckout = async () => {
    const stripeItems = items.map((item) => ({
      price: item.product.stripe_id,
      quantity: item.quantity,
    }));

    const res = await axios.post('/api/checkout_sessions', {
      items: stripeItems,
    });

    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: res.data.id });
  };

  return (
    <Page>
      <div className={styles.container}>
        <div className={styles.order}>
          <h3 className={styles.title}>MY ORDER</h3>
          {items.length > 0 ? (
            items.map((item) => (
              <CardItems
                key={item.product.id}
                item={item.product}
                quantity={item.quantity}
              />
            ))
          ) : (
            <div className={styles.noItems}>
              <p className={styles.noItemsTitle}>The order is empty</p>

              <Button href="/" text="ADD ITEMS" />
            </div>
          )}
          <div className={styles.total}>
            <p>TOTAL</p>
            <p>{total} €</p>
          </div>
          {items.length > 0 && (
            <Button text="CONFIRM ORDER" onClick={redirectToCheckout} />
          )}
        </div>
      </div>
    </Page>
  );
}

export default Order;
