/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import useTotalItems from '../../hooks/useTotalItems';
import Container from '../../layout/Container/Container';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';

function Navigation({ items, displayCartIcon }) {
  const { cart } = useSelector((state) => state);

  const totalItems = useTotalItems(cart.items);

  return (
    <nav className={styles.Navigation}>
      <Container style={styles.container}>
        <ul className={styles.NavigationList}>
          {items && items.map((item, i) => <NavItem key={i} item={item} />)}
        </ul>
        {displayCartIcon && (
          <div className={styles.cart}>
            <Link href="/order">
              <a>
                <MdOutlineShoppingCart />
                <span className={styles.totalItems}>{totalItems}</span>
              </a>
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navigation;
