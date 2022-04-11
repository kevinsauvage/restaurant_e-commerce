/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './NavItem.module.scss';

function NavItem({ item }) {
  const router = useRouter();

  const [asPath, setAsPath] = useState('');

  useEffect(() => setAsPath(router.asPath), [router.asPath]);

  return (
    <li className={styles.NavigationItem}>
      <Link href={item.path}>
        <a
          className={item.activePath?.includes(asPath) ? styles.itemActive : ''}
        >
          {item.title}
        </a>
      </Link>
    </li>
  );
}

export default NavItem;
