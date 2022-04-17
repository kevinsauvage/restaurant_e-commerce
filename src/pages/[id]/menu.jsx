import { useCallback } from 'react';
import { useRouter } from 'next/router';
import SectionItems from '../../components/SectionItems/SectionItems';
import Page from '../../layout/Page/Page';
import items from '../../data/restaurant';
import styles from './menu.module.scss';
import useScrollDirection from '../../hooks/useScrollDirection';

function Menu({ restaurant }) {
  const router = useRouter();
  const scrollDirection = useScrollDirection();

  const handlePushHash = useCallback(
    (path) => router.push(path, undefined, { shallow: true }),
    []
  );

  const handlePathChange = (title, onScreen) => {
    const actualPath = router.asPath;
    const nextPath = encodeURI(
      `${router.pathname.replace('[id]', `${router.query.id}`)}#${title
        .split(' ')
        .join('_')}`
    );

    if (!window.location.hash) return handlePushHash(nextPath);

    const actualHashTop = document
      .querySelector(window.location.hash)
      .getBoundingClientRect().top;

    const sectionHash = document
      .querySelector(`#${title.split(' ').join('_')}`)
      .getBoundingClientRect().top;

    if (actualHashTop > sectionHash && scrollDirection === 'down') return null;

    if (onScreen && actualPath !== nextPath && scrollDirection === 'down') {
      handlePushHash(nextPath);
    }
    return null;
  };

  return (
    <Page
      renderCart
      displayCartIcon
      restaurant={restaurant}
      bannerTitle={restaurant?.name}
      bannerSubtitle={restaurant?.address}
      title={restaurant?.name}
      description={` Buy food online at ${restaurant?.name} and receive it at home. Whatever you ask for, in minutes.`}
    >
      <div className={styles.container}>
        {restaurant &&
          restaurant.products.map((item) => (
            <SectionItems
              handlePathChange={handlePathChange}
              key={item.title}
              title={item.title}
              items={item.items}
            />
          ))}
      </div>
    </Page>
  );
}

export default Menu;

export async function getStaticProps({ params }) {
  const restaurant = items.filter(
    (item) => item.name.split(' ').join('_') === params.id
  );

  return {
    props: {
      restaurant: restaurant[0],
    },
  };
}

export async function getStaticPaths() {
  const paths = items.map((item) => ({
    params: { id: item.name.split(' ').join('_') },
  }));

  return {
    paths,
    fallback: false,
  };
}
