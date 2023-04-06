import SectionItems from '../../components/SectionItems/SectionItems';
import items from '../../data/restaurant';
import Page from '../../layout/Page/Page';

import styles from './menu.module.scss';

const Menu = ({ restaurant }) => (
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
      {restaurant?.products.map((item) => (
        <SectionItems key={item.title} title={item.title} items={item.items} />
      ))}
    </div>
  </Page>
);

export default Menu;

export async function getStaticProps({ params }) {
  const restaurant = items.find((item) => item.name.split(' ').join('_') === params.id);
  return { props: { restaurant } };
}

export async function getStaticPaths() {
  const paths = items.map((item) => ({ params: { id: item.name.split(' ').join('_') } }));
  return { fallback: false, paths };
}
