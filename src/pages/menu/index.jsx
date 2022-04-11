import SectionItems from '../../components/SectionItems/SectionItems';
import items from '../../data/menuItems';
import Page from '../../layout/Page/Page';

function Menu() {
  const navItems = items.map((item) => ({
    title: item.title,
    path: item.path,
    activePath: item.activePath,
  }));

  return (
    <Page renderCart navItems={navItems} displayCartIcon>
      <div>
        {items.slice(1).map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <SectionItems key={i} title={item.title} items={item.items} />
        ))}
      </div>
    </Page>
  );
}

export default Menu;
