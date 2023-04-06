import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import OrderCard from '../../components/orderCard/OrderCard';
import getUser from '../../helpers/getUser';
import { getItem } from '../../helpers/localStorage';
import Page from '../../layout/Page/Page';
import { addUser } from '../../store/user/action';

import styles from './user.module.scss';

const User = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!getItem('user')) router.push('/login');
  }, [router, user]);

  useEffect(() => {
    if (getItem('user') && user.email) {
      getUser(user.email).then((newUser) => {
        if (newUser) dispatch(addUser(newUser));
      });
    }
  }, [dispatch, user.email]);

  return (
    <Page
      bannerTitle={`${user?.firstName} ${user?.lastName}`}
      bannerSubtitle={user?.email}
      title="User account"
    >
      <div className={styles.user}>
        <div className={styles.orderInfo}>
          <h2 className={styles.title}>LAST ORDERS</h2>
          <div className={styles.cards}>
            {user?.orders?.length > 0 ? (
              user?.orders?.map(
                (order) => order !== null && <OrderCard key={order.created} order={order} />
              )
            ) : (
              <p>There is no last orders.</p>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default User;
