import { useRouter } from 'next/router';
import { useLayoutEffect, useCallback,  useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import useScrollDirection from '../../hooks/useScrollDirection';
import CardItems from '../CardItem/CardItems';
import styles from './SectionItems.module.scss';

function SectionItems({ title, items }) {
  const ref = useRef(null);
  const router = useRouter();
  const onScreen = useOnScreen(ref, '0px 0px -80%', 0);
  const scrollDirection = useScrollDirection();

  const handlePushHash = useCallback(
    (path) => router.push(path, undefined, { shallow: true }),
    []
  );

  const handlePathChange = useCallback(() => {
    const actualPath = router.asPath;
    const nextPath = encodeURI(
      `${router.pathname.replace('[id]', `${router.query.id}`)}#${title}`
    );

    if (!window.location.hash) return handlePushHash(nextPath);

    const actualHashTop = document
      .querySelector(window.location.hash)
      .getBoundingClientRect().top;

    const sectionHash = document
      .querySelector(`#${title}`)
      .getBoundingClientRect().top;

    if (actualHashTop > sectionHash && scrollDirection === 'down') return null;

    if (onScreen && actualPath !== nextPath) {
      handlePushHash(nextPath);
    }
    return null;
  }, [onScreen, items]);

  useLayoutEffect(() => {
    handlePathChange();
  }, [onScreen, items]);

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
