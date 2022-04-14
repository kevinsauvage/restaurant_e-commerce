import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrderCard from '../../components/orderCard/OrderCard';
import isNoUser from '../../helpers/isNoUser';
import Page from '../../layout/Page/Page';
import styles from './user.module.scss';

function User() {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!isNoUser(user)) router.push('/login');
  }, [user]);

  return (
    <Page
      bannerTitle={`${user?.firstName} ${user?.lastName}`}
      bannerSubtitle={user?.email}
    >
      <div className={styles.user}>
        <div className={styles.orderInfo}>
          <h2 className={styles.title}>Last orders</h2>
          <div className={styles.cards}>
            {user?.orders?.map(
              (order) => order !== null && <OrderCard orderId={order} />
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

export default User;
