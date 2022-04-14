/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import useTotalItems from '../../hooks/useTotalItems';
import Container from '../../layout/Container/Container';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';
import isNoUser from '../../helpers/isNoUser';
import { addUser } from '../../store/user/action';

function Navigation({ navItems }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cart, user } = useSelector((state) => state);

  const totalItems = useTotalItems(cart.items);

  const handleLogout = () => {
    dispatch(addUser({}));
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
            navItems.map((item, i) => <NavItem key={i} title={item.title} />)}
        </ul>
        <div className={styles.navigationRight}>
          <Link href="/order">
            <a className={styles.cart}>
              <MdOutlineShoppingCart />
              <span className={styles.totalItems}>{totalItems}</span>
            </a>
          </Link>
          {!isNoUser(user.user) ? (
            <Link href={`/login?redirectTo=${router.asPath}`}>
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
      </Container>
    </nav>
  );
}

export default Navigation;
