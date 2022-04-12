import SectionItems from '../components/SectionItems/SectionItems';
import items from '../data/menuItems';
import Page from '../layout/Page/Page';

export default function Home() {
  return (
    <Page renderCart>
      <SectionItems title="Formules" items={items[0].items} />
    </Page>
  );
}
