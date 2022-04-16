import { useRef, useEffect } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import CardItems from '../CardItem/CardItems';
import styles from './SectionItems.module.scss';

function SectionItems({ title, items, handlePathChange }) {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, '0px 0px -80%', 0);

  useEffect(() => {
    if (handlePathChange) handlePathChange(title, onScreen);
  }, [onScreen, items]);

  return (
    <section
      className={styles.SectionItems}
      id={title.split(' ').join('_')}
      ref={ref}
    >
      <p className={styles.title}>{title}</p>
      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <CardItems key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

export default SectionItems;
