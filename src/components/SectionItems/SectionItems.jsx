import CardItems from '../CardItem/CardItems';

import styles from './SectionItems.module.scss';

const SectionItems = ({ title, items }) => (
  <section className={styles.SectionItems}>
    <p className={styles.title}>{title}</p>
    <div className={styles.itemsContainer}>
      {items.map((item) => (
        <CardItems key={item.name} item={item} />
      ))}
    </div>
  </section>
);

export default SectionItems;
