import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Button from '../../components/Button/Button';
import Page from '../../layout/Page/Page';
import { setInitalState } from '../../store/cart/action';
import { setItem } from '../../utils/storage';
import styles from './confirmation.module.scss';
import succesImg from '../../assets/images/success.png';

function Confirmation() {
  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const getSession = async () => {
      const res = await axios.get(`/api/checkout_sessions/${query.session_id}`);

      if (res.data.payment_status === 'paid') {
        setItem('cart_items', []);
        dispatch(setInitalState([]));
      }
    };

    if (query.session_id) getSession();
  }, [query.session_id]);

  return (
    <Page>
      <div className={styles.confirmation}>
        <h1 className={styles.title}>Your order is confirmed</h1>
        <h2 className={styles.subtitle}>
          Thank you for shopping with us ! <br />
          Your order will reach you really soon.
        </h2>
        <div className={styles.image}>
          <Image src={succesImg} layout="fill" objectFit="contain" />
        </div>
        <Button href="/" text="BACK TO HOME" />
      </div>
    </Page>
  );
}

export default Confirmation;
