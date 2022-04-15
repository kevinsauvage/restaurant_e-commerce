import Image from 'next/image';
import Link from 'next/link';
import styles from './RestaurantCard.module.scss';

function RestaurantCard({ item }) {
  return (
    <div className={styles.card}>
      <Link href={encodeURI(`/${item.name.split(' ').join('_')}/menu`)}>
        <a className={styles.link}>
          <div className={styles.img}>
            <Image src={item.image} layout="fill" objectFit="cover" />
          </div>
          <div className={styles.details}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.type}>{item.type}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default RestaurantCard;
