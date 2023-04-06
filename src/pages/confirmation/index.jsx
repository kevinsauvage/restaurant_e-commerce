import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';

import failImg from '../../assets/images/fail.png';
import succesImg from '../../assets/images/success.png';
import Button from '../../components/Button/Button';
import apiHelper from '../../helpers/apiHelper';
import Page from '../../layout/Page/Page';
import { setInitalState } from '../../store/cart/action';

import styles from './confirmation.module.scss';

const Confirmation = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState();

  useEffect(() => {
    const getSession = async () => {
      const response = await apiHelper(
        `/api/checkout_sessions/${query.session_id}`,
        undefined,
        'GET'
      );

      if (response && response?.session?.payment_status === 'paid') {
        dispatch(setInitalState([]));
        setSuccess(true);
      } else setSuccess(false);
    };

    if (query.session_id) getSession();
    if (query.success === 'false') setSuccess(false);
  }, [dispatch, query]);

  return (
    <Page title="Payment confirmation">
      <div className={styles.confirmation}>
        {success === true && (
          <>
            <h1 className={styles.title}>Your order is confirmed</h1>
            <h2 className={styles.subtitle}>
              Thank you for shopping with us ! <br />
              Your order will reach you really soon.
            </h2>
            <div className={styles.image}>
              <Image alt="Success" src={succesImg} layout="fill" objectFit="contain" />
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
              <Image alt="Fail" src={failImg} layout="fill" objectFit="contain" />
            </div>
            <Button href="/order" text="BACK TO ORDER" />
          </>
        )}
      </div>
    </Page>
  );
};

export default Confirmation;
