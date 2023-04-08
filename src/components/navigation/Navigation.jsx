import { FaArrowAltCircleLeft, FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import isNoUser from '../../helpers/isNoUser';
import useTotalItems from '../../hooks/useTotalItems';
import goBackOrHome from '../../utils/go-back';
import Container from '../Container/Container';
import NavItem from '../NavItem/NavItem';

import styles from './Navigation.module.scss';

const Navigation = () => {
  const { asPath, pathname } = useRouter();
  const router = useRouter();

  const { cart, user } = useSelector((state) => state);

  const totalItems = useTotalItems(cart.items);

  return (
    <nav className={styles.navigation}>
      <Container style={styles.container}>
        <ul className={styles.navigationList}>
          <NavItem href="/" title="Home" />
          {pathname !== '/' && (
            <li className={styles.navItem}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => goBackOrHome(router)}
                onKeyDown={(event) => event.key === 'Enter' && goBackOrHome(router)}
                className={asPath === '/' ? styles.itemActive : ''}
              >
                <FaArrowAltCircleLeft />
                Back
              </div>
            </li>
          )}
        </ul>
        <div className={`${styles.navigationRight}`}>
          {isNoUser(user.user) ? (
            <Link href="/user">
              <a className={styles.user}>
                <FaRegUser />
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a className={styles.logBtn}>Login</a>
            </Link>
          )}
          <Link href="/cart">
            <a className={styles.cart}>
              <MdOutlineShoppingCart />
              <span className={styles.totalItems}>{totalItems}</span>
            </a>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
