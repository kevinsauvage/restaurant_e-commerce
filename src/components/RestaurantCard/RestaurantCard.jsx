import Image from 'next/image';
import Link from 'next/link';

import { formatUrlText } from '../../utils/url';

import styles from './RestaurantCard.module.scss';

const RestaurantCard = ({ item }) => (
  <div className={styles.card}>
    <Link href={`/${formatUrlText(item.name)}/menu`}>
      <a>
        <div className={styles.img}>
          <Image alt={item.name} src={item.image} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.details}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.type}>{item.type}</p>
        </div>
      </a>
    </Link>
  </div>
);

export default RestaurantCard;
