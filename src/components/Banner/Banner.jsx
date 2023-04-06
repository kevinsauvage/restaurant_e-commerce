import Image from 'next/image';

import BannerImage from '../../assets/images/banner.jpg';
import Logo from '../../assets/images/logo.png';

import styles from './Banner.module.scss';

const Banner = ({ restaurant, title, subtitle }) => (
  <div className={styles.Banner}>
    <div className={styles.BannerImg}>
      <Image
        src={BannerImage}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        objectPosition="top"
        priority
      />
      <div className={styles.logo}>
        <div>
          <Image
            alt={title}
            src={restaurant?.image || Logo}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </div>
      </div>
    </div>
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{restaurant?.name || title || 'UpToGo'}</h1>
      <h2 className={styles.subtitle}>
        {restaurant?.address || subtitle || 'Ordering your favorite foud made easy'}
      </h2>
    </div>
  </div>
);

export default Banner;
