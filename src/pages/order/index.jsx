import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useTotalPrice from '../../hooks/useTotalPrice';
import Page from '../../layout/Page/Page';
import styles from './order.module.scss';
import CardItems from '../../components/CardItem/CardItems';
import Button from '../../components/Button/Button';
import apiHelper from '../../helpers/apiHelper';
import getStripe from '../../utils/get-stripe';
import isNoUser from '../../helpers/isNoUser';

function Order() {
  const { cart, user } = useSelector((state) => state);
  const total = useTotalPrice(cart.items);
  const router = useRouter();

  const redirectToCheckout = async () => {
    if (!isNoUser(user.user)) {
      return router.push(`/login?redirectTo=${router.asPath}`);
    }

    const res = await apiHelper('/api/checkout_sessions', {
      items: cart.items,
      user: user.user,
    });

    if (!res || !res.id) return null;

    const stripe = await getStripe();

    return stripe.redirectToCheckout({ sessionId: res.id });
  };

  return (
    <Page>
      <div className={styles.container}>
        <div className={styles.order}>
          <h3 className={styles.title}>MY ORDER</h3>
          {cart.items.length > 0 ? (
            cart.items.map((item) => (
              <CardItems
                key={item.product.name}
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
          {cart.items.length > 0 && (
            <Button text="CONFIRM ORDER" onClick={redirectToCheckout} />
          )}
        </div>
      </div>
    </Page>
  );
}

export default Order;
