/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import useTotalItems from '../../hooks/useTotalItems';
import Container from '../../layout/Container/Container';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';
import items from '../../data/menuItems';

function Navigation() {
  const { cart } = useSelector((state) => state);

  const totalItems = useTotalItems(cart.items);

  const navItems = items.map((item) => ({
    title: item.title,
    path: item.path,
    activePath: item.activePath,
  }));

  return (
    <nav className={styles.navigation}>
      <Container style={styles.container}>
        <ul className={styles.navigationList}>
          {navItems &&
            navItems.map((item, i) => <NavItem key={i} item={item} />)}
        </ul>
        <div className={styles.navigationRight}>
          <Link href="/order">
            <a className={styles.cart}>
              <MdOutlineShoppingCart />
              <span className={styles.totalItems}>{totalItems}</span>
            </a>
          </Link>
          <Link href="/user">
            <a className={styles.user}>
              <FaRegUser />
            </a>
          </Link>
        </div>
      </Container>
    </nav>
  );
}

export default Navigation;
