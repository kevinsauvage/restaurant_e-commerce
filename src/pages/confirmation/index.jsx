import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Button from '../../components/Button/Button';
import Page from '../../layout/Page/Page';
import { setInitalState } from '../../store/cart/action';
import styles from './confirmation.module.scss';
import succesImg from '../../assets/images/success.png';
import failImg from '../../assets/images/fail.png';
import apiHelper from '../../helpers/apiHelper';
// import { addUser } from '../../store/user/action';

function Confirmation() {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(null);
  // const { user } = useSelector((state) => state.user);

  /* const updateUserOrders = async (newOrder) => {
    const orders = [...user.orders, newOrder];
    const res = await apiHelper(
      '/api/user',
      { updatedFields: { orders }, email: user.email },
      'PUT'
    );

    if (res && res.success) {
      dispatch(addUser(res.user));
    }
  }; */

  useEffect(() => {
    const getSession = async () => {
      const res = await apiHelper(
        `/api/checkout_sessions/${query.session_id}`,
        null,
        'GET'
      );

      if (res && res?.session?.payment_status === 'paid') {
        dispatch(setInitalState([]));
        setSuccess(true);
        // if (res?.session?.id) updateUserOrders(res.session.id);
      } else setSuccess(false);
    };

    if (query.session_id) getSession();
    if (query.success === 'false') setSuccess(false);
  }, [query]);

  return (
    <Page>
      <div className={styles.confirmation}>
        {success === true && (
          <>
            <h1 className={styles.title}>Your order is confirmed</h1>
            <h2 className={styles.subtitle}>
              Thank you for shopping with us ! <br />
              Your order will reach you really soon.
            </h2>
            <div className={styles.image}>
              <Image src={succesImg} layout="fill" objectFit="contain" />
            </div>
            <Button href="/" text="BACK TO HOME" />
          </>
        )}

        {success === false && (
          <>
            <h1 className={styles.title}>Payment failure</h1>
            <h2 className={styles.subtitle}>
              Something went wrong during the payment, <br />
              please, try again.
            </h2>
            <div className={styles.image}>
              <Image src={failImg} layout="fill" objectFit="contain" />
            </div>
            <Button href="/order" text="BACK TO ORDER" />
          </>
        )}
      </div>
    </Page>
  );
}

export default Confirmation;
