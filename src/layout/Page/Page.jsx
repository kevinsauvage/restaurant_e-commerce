import Head from 'next/head';
import Banner from '../../components/Banner/Banner';
import Cart from '../../components/Cart/Cart';
import Navigation from '../../components/navigation/Navigation';
import Container from '../Container/Container';
import styles from './Page.module.scss';

function Page({
  children,
  title,
  description,
  style,
  renderCart,
  restaurant,
  bannerTitle,
  bannerSubtitle,
}) {
  return (
    <div style={style} className={styles.Page}>
      <Head>
        <title>{`UpToGo | ${title}`}</title>
        <meta
          name="description"
          content={`UpToGo | ${description || '| Ordering food made easy'}`}
        />
      </Head>
      <Banner
        restaurant={restaurant}
        title={bannerTitle}
        subtitle={bannerSubtitle}
      />
      <Navigation navItems={restaurant?.products} />
      <Container style={styles.container}>
        {children}
        {renderCart && <Cart />}
      </Container>
    </div>
  );
}

export default Page;
