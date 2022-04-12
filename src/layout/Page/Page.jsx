import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../components/Banner/Banner';
import Cart from '../../components/Cart/Cart';
import Navigation from '../../components/navigation/Navigation';
import { setInitalState } from '../../store/cart/action';
import { getItem } from '../../utils/storage';
import Container from '../Container/Container';
import styles from './Page.module.scss';

function Page({ children, title, description, style, renderCart }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!items.length) {
      const savedItems = getItem('cart_items');
      if (savedItems) dispatch(setInitalState(savedItems));
    }
  }, [items]);

  return (
    <div style={style} className={styles.Page}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Navigation />
      <Container style={styles.container}>
        {children}
        {renderCart && <Cart />}
      </Container>
    </div>
  );
}

export default Page;
