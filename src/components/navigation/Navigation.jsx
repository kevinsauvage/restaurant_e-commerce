import { useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMenu, MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import apiHelper from '../../helpers/apiHelper';
import isNoUser from '../../helpers/isNoUser';
import { setItem } from '../../helpers/localStorage';
import useClickOutside from '../../hooks/useClickOutside';
import useTotalItems from '../../hooks/useTotalItems';
import { addUser } from '../../store/user/action';
import Container from '../Container/Container';
import NavItem from '../NavItem/NavItem';

import styles from './Navigation.module.scss';

const Navigation = ({ navItems }) => {
  const dispatch = useDispatch();
  const navReference = useRef();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  const { cart, user } = useSelector((state) => state);

  const totalItems = useTotalItems(cart.items);

  const handleLogout = () => {
    dispatch(addUser({}));
    setItem('user');
    apiHelper('/api/logout');
  };

  useClickOutside(navReference, () => navOpen && setNavOpen(false));

  return (
    <nav className={styles.navigation} ref={navReference}>
      <Container style={styles.container}>
        <ul className={styles.navigationList}>
          <li className={styles.navItem}>
            <Link href="/">
              <a className={router.asPath === '/' ? styles.itemActive : ''}>Restaurants</a>
            </Link>
          </li>
          {navItems?.map((item) => (
            <NavItem key={item.title} title={item.title} />
          ))}
        </ul>
        <div className={`${styles.navigationRight} ${navOpen ? styles.navigationOpen : ''}`}>
          <Link href="/order">
            <a className={styles.cart}>
              <MdOutlineShoppingCart />
              <span className={styles.totalItems}>{totalItems}</span>
            </a>
          </Link>
          {isNoUser(user.user) ? (
            <>
              <Link href="/user">
                <a className={styles.user}>
                  <FaRegUser />
                </a>
              </Link>
              <button type="submit" className={styles.logBtn} onClick={handleLogout}>
                <p>Logout</p>
              </button>
            </>
          ) : (
            <Link href="/login">
              <a className={styles.logBtn}>Login</a>
            </Link>
          )}
        </div>
        <div className={styles.hamburger}>
          <MdOutlineMenu onClick={() => setNavOpen((previous) => !previous)} />
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
