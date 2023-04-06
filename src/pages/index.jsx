import Head from 'next/head';

import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import items from '../data/restaurant';
import Page from '../layout/Page/Page';

import styles from '../styles/Home.module.css';

const Home = () => (
  <Page>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>UpToGo</title>
      <meta name="description" content="UpToGo | Ordering food made easy" />
    </Head>
    <div className={styles.container}>
      {items.map((item) => (
        <RestaurantCard key={item.name} item={item} />
      ))}
    </div>
  </Page>
);

export default Home;
