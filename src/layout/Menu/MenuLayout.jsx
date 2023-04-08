import Cart from '../../components/Cart/Cart';
import MenuNavigation from '../../components/MenuNavigation/MenuNavigation';
import Page from '../Page/Page';

import styles from './MenuLayout.module.scss';

const MenuLayout = ({ children, restaurant }) => (
  <Page
    renderCart
    displayCartIcon
    restaurant={restaurant}
    title={restaurant?.name}
    description={` Buy food online at ${restaurant?.name} and receive it at home. Whatever you ask for, in minutes.`}
  >
    <div className={styles.container}>
      <div>
        <h1 className={styles.name}>{restaurant?.name}</h1>
        <MenuNavigation restaurant={restaurant} />
        {children}
      </div>
      <Cart />
    </div>
  </Page>
);

export default MenuLayout;
