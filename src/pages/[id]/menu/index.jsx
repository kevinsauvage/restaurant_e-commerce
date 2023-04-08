import SectionItems from '../../../components/SectionItems/SectionItems';
import items from '../../../data/restaurant';
import MenuLayout from '../../../layout/Menu/MenuLayout';
import { formatUrlText } from '../../../utils/url';

import styles from './menu.module.scss';

const Menu = ({ restaurant }) => (
  <MenuLayout restaurant={restaurant}>
    <div className={styles.container}>
      {restaurant?.products.map((item) => (
        <SectionItems key={item.title} title={item.title} items={item.items} />
      ))}
    </div>
  </MenuLayout>
);

export default Menu;

export async function getStaticProps({ params }) {
  const restaurant = items.find((item) => formatUrlText(item.name) === params.id);
  return { props: { restaurant } };
}

export async function getStaticPaths() {
  const paths = items.map((item) => ({ params: { id: formatUrlText(item.name) } }));
  return { fallback: false, paths };
}
