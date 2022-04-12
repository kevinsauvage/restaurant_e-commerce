import SectionItems from '../../components/SectionItems/SectionItems';
import items from '../../data/menuItems';
import Page from '../../layout/Page/Page';

function Menu() {
  return (
    <Page renderCart displayCartIcon>
      <div>
        {items.slice(1).map((item) => (
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
