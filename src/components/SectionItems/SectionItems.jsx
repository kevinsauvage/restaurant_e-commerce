import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import useScrollDirection from '../../hooks/useScrollDirection';
import CardItems from '../CardItem/CardItems';
import styles from './SectionItems.module.scss';

function SectionItems({ title, items }) {
  const ref = useRef(null);
  const router = useRouter();
  const onScreen = useOnScreen(ref, '0px', 0.5);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    if (!window.location.hash) return;

    const actualHashTop = document
      .querySelector(window.location.hash)
      .getBoundingClientRect().top;

    const sectionHash = document
      .querySelector(`#${title}`)
      .getBoundingClientRect().top;

    if (actualHashTop > sectionHash && scrollDirection === 'down') return;

    if (
      onScreen &&
      router.asPath !== '/' &&
      router.asPath !== `/menu#${title}`
    ) {
      router.push(`/menu#${title}`, undefined, { shallow: true });
    }
  }, [onScreen]);

  return (
    <section className={styles.SectionItems} id={title} ref={ref}>
      <p className={styles.title}>{title}</p>
      <div className={styles.itemsContainer}>
        {items.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <CardItems key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

export default SectionItems;
