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

    fetch(`https://api.edamam.com/api/recipes/v2?q=a&app_id=2bb77dc4&app_key=
    423b13f39fcad943c442b80f59f1e8dd&type=public&dishType=Desserts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const array = [];
        data.hits.forEach((item) => {
          array.push({
            name: item.recipe.label,
            url: item.recipe.image,
            description: item.recipe.ingredients.map((el) => el.food),
            price: Math.floor(Math.random() * 10) + 1,
          });
        });
        console.log(JSON.stringify(array));
      });
  }, [user]);

  return (
    <Page>
      <div className={styles.user}>
        <div className={styles.userInfo}>
          <h1 className={styles.title}>User information</h1>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.email}</p>
        </div>
        <div className={styles.orderInfo}>
          <h2 className={styles.title}>Orders</h2>
          {user?.orders?.map((order) => (
            <OrderCard orderId={order} />
          ))}
        </div>
      </div>
    </Page>
  );
}

export default User;
