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
    <MenuNavigation restaurant={restaurant} />
    <div className={styles.container}>
      {children}
      <Cart />
    </div>
  </Page>
);

export default MenuLayout;
