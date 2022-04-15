import Link from 'next/link';
import { MdOutlineMenu, MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useTotalItems from '../../hooks/useTotalItems';
import Container from '../../layout/Container/Container';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';
import isNoUser from '../../helpers/isNoUser';
import { addUser } from '../../store/user/action';
import { setItem } from '../../helpers/localStorage';

function Navigation({ navItems }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  const { cart, user } = useSelector((state) => state);

  const totalItems = useTotalItems(cart.items);

  const handleLogout = () => {
    dispatch(addUser({}));
    setItem('user', null);
  };

  return (
    <nav className={styles.navigation}>
      <Container style={styles.container}>
        <ul className={styles.navigationList}>
          <li className={styles.navItem}>
            <Link href="/">
              <a className={router.asPath === '/' ? styles.itemActive : ''}>
                Restaurants
              </a>
            </Link>
          </li>
          {navItems &&
            navItems.map((item) => (
              <NavItem key={item.title} title={item.title} />
            ))}
        </ul>

        <div
          className={
            `${styles.navigationRight}` +
            ' ' +
            `${navOpen ? styles.navigationOpen : ''}`
          }
        >
          <Link href="/order">
            <a className={styles.cart}>
              <MdOutlineShoppingCart />
              <span className={styles.totalItems}>{totalItems}</span>
            </a>
          </Link>
          {!isNoUser(user.user) ? (
            <Link
              href={{
                pathname: '/login',
                query: { redirectTo: router.asPath },
              }}
            >
              <a className={styles.logBtn}>Login</a>
            </Link>
          ) : (
            <>
              <Link href="/user">
                <a className={styles.user}>
                  <FaRegUser />
                </a>
              </Link>
              <button
                type="submit"
                className={styles.logBtn}
                onClick={handleLogout}
              >
                <p>Logout</p>
              </button>
            </>
          )}
        </div>
        <div className={styles.hamburger}>
          <MdOutlineMenu onClick={() => setNavOpen((prev) => !prev)} />
        </div>
      </Container>
    </nav>
  );
}

export default Navigation;
