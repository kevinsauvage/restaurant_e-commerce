import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './NavItem.module.scss';

const NavItem = ({ title }) => {
  const { asPath } = useRouter();

  const path = encodeURI(`${asPath.split('#')[0]}#${title?.split(' ').join('_')}`);

  return (
    <li className={styles.NavigationItem}>
      <Link href={path}>
        <a className={path === asPath ? styles.itemActive : ''}>{title}</a>
      </Link>
    </li>
  );
};

export default NavItem;
