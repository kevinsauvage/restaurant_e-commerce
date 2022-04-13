import Head from 'next/head';
import Banner from '../../components/Banner/Banner';
import Cart from '../../components/Cart/Cart';
import Navigation from '../../components/navigation/Navigation';
import Container from '../Container/Container';
import styles from './Page.module.scss';

function Page({ children, title, description, style, renderCart }) {
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
