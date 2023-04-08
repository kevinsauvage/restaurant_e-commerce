import SectionItems from '../../../../components/SectionItems/SectionItems';
import items from '../../../../data/restaurant';
import MenuLayout from '../../../../layout/Menu/MenuLayout';
import { formatUrlText } from '../../../../utils/url';

const Index = ({ restaurant, type }) => (
  <MenuLayout restaurant={restaurant}>
    {restaurant?.products
      ?.filter((element) => formatUrlText(element.title) === type)
      ?.map((item) => (
        <SectionItems key={item.title} title={item.title} items={item.items} />
      ))}
  </MenuLayout>
);
export default Index;

export async function getServerSideProps({ params }) {
  const restaurant = items.find((item) => formatUrlText(item.name) === params.id);
  const { type } = params;
  return { props: { restaurant, type } };
}
