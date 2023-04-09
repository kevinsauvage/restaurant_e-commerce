import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './NavItem.module.scss';

const NavItem = ({ title, svg, href, ...rest }) => {
  const { asPath } = useRouter();

  return (
    <li className={styles.NavigationItem}>
      <Link href={href} {...rest}>
        <a className={href === asPath ? styles.itemActive : ''}>
          {svg} {title}
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
