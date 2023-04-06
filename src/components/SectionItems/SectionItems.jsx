import { useEffect, useRef } from 'react';

import useOnScreen from '../../hooks/useOnScreen';
import CardItems from '../CardItem/CardItems';

import styles from './SectionItems.module.scss';

const SectionItems = ({ title, items, handlePathChange }) => {
  const reference = useRef(null);
  const onScreen = useOnScreen(reference, '0px 0px -80%', 0);

  useEffect(() => {
    if (handlePathChange) handlePathChange(title, onScreen);
  }, [onScreen, items, handlePathChange, title]);

  return (
    <section className={styles.SectionItems} id={title?.split(' ').join('_')} ref={reference}>
      <p className={styles.title}>{title}</p>
      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <CardItems key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
};

export default SectionItems;
