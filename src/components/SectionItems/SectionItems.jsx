import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useOnScreen from '../../hooks/useOnScreen';
import { addSelectedItem } from '../../store/user/action';
import CardItems from '../CardItem/CardItems';
import styles from './SectionItems.module.scss';

function SectionItems({ title, items, handlePathChange }) {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, '0px 0px -80%', 0);
  const dispach = useDispatch();

  useEffect(() => {
    if (handlePathChange) handlePathChange(title, onScreen);
  }, [onScreen, items]);

  const handleSelectItem = (item) => {
    dispach(addSelectedItem(item));
  };

  return (
    <section className={styles.SectionItems} id={title} ref={ref}>
      <p className={styles.title}>{title}</p>
      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <CardItems
            key={item.name}
            item={item}
            selectItem={handleSelectItem}
          />
        ))}
      </div>
    </section>
  );
}

export default SectionItems;
