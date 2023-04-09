import { useSelector } from 'react-redux';
import Link from 'next/link';

import { home, iconCart, iconUser } from '../../assets/images/svg';
import isNoUser from '../../helpers/isNoUser';
import useTotalItems from '../../hooks/useTotalItems';
import Container from '../Container/Container';

import styles from './Navigation.module.scss';

const Navigation = () => {
  const { cart, user } = useSelector((state) => state);

  const totalItems = useTotalItems(cart.items);

  const navigationItems = [{ href: '/', label: 'Home', svg: home }];
  const navigationItemsRight = [
    { href: isNoUser(user.user) ? '/user' : '/login', svg: iconUser },
    {
      child: totalItems > 0 && <span className={styles.totalItems}>{totalItems}</span>,
      href: '/cart',
      svg: iconCart,
    },
  ];

  return (
    <nav className={styles.navigation}>
      <Container style={styles.container}>
        <ul className={styles.navigationList}>
          {navigationItems.map((item) => (
            <li className={styles['list-item']} key={item.label}>
              <Link href={item.href}>
                <a>
                  {item.svg} {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={`${styles.navigationRight}`}>
          {navigationItemsRight.map((item) => (
            <li className={styles['list-item']} key={item.href}>
              <Link href={item.href}>
                <a>
                  {item.svg} {item.child}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};

export default Navigation;
