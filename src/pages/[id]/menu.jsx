import SectionItems from '../../components/SectionItems/SectionItems';
import Page from '../../layout/Page/Page';
import items from '../../data/restaurant';

function Menu({ restaurant }) {
  return (
    <Page
      renderCart
      displayCartIcon
      restaurant={restaurant}
      bannerTitle={restaurant?.name}
      bannerSubtitle={restaurant?.address}
      title={restaurant?.name}
      description={` Buy Tostadas online at ${restaurant?.name} and receive it at home. Whatever you ask for, in minutes.`}
    >
      <div>
        {restaurant &&
          restaurant.products.map((item) => (
            <SectionItems
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
  const restaurant = items.filter((item) => item.name === params.id);

  return {
    props: {
      restaurant: restaurant[0],
    },
  };
}

export async function getStaticPaths() {
  const paths = items.map((item) => ({ params: { id: item.name } }));

  return {
    paths,
    fallback: false,
  };
}
