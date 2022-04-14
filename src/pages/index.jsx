import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import items from '../data/restaurant';
import Page from '../layout/Page/Page';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Page>
      <div className={styles.container}>
        {items.map((item) => (
          <RestaurantCard key={item.name} item={item} />
        ))}
      </div>
    </Page>
  );
}
