import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './NavItem.module.scss';

const NavItem = ({ title }) => {
  const router = useRouter();
  const [asPath, setAsPath] = useState('');

  useEffect(() => setAsPath(router.asPath), [router.asPath]);

  const path = encodeURI(
    `${router.pathname.replace('[id]', router.query.id)}#${title?.split(' ').join('_')}`
  );

  return (
    <li className={styles.NavigationItem}>
      <Link href={path}>
        <a className={path === asPath ? styles.itemActive : ''}>{title}</a>
      </Link>
    </li>
  );
};

export default NavItem;
