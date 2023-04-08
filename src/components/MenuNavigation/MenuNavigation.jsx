import { formatUrlText } from '../../utils/url';
import NavItem from '../NavItem/NavItem';

import styles from './MenuNavigation.module.scss';

const MenuNavigation = ({ restaurant }) => (
  <div className={styles.MenuNavigation}>
    <NavItem scroll={false} title="All" href={`/${formatUrlText(restaurant.name)}/menu`} />
    {restaurant?.products?.map((item) => (
      <NavItem
        key={item.title}
        title={item.title}
        scroll={false}
        href={`/${formatUrlText(restaurant.name)}/menu/${formatUrlText(item.title)}`}
      />
    ))}
  </div>
);

export default MenuNavigation;
