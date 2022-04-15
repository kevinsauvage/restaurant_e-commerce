import SectionItems from '../../components/SectionItems/SectionItems';
import Page from '../../layout/Page/Page';
import items from '../../data/restaurant';
import styles from './menu.module.scss';

function Menu({ restaurant }) {
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
              key={item.title}
              title={item.title.split(' ').join('_')}
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
