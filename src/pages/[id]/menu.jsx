import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SectionItems from '../../components/SectionItems/SectionItems';
import Page from '../../layout/Page/Page';
import items from '../../data/restaurant';

function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const res = items.filter((item) => item.name === id);
    setRestaurant(res[0]);
  }, [id]);

  return (
    <Page
      renderCart
      displayCartIcon
      restaurant={restaurant}
      bannerTitle={restaurant?.name}
      bannerSubtitle={restaurant?.address}
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
