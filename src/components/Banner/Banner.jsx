import Image from 'next/image';

import BannerImage from '../../assets/images/banner.jpg';
import Logo from '../../assets/images/logo.png';

import styles from './Banner.module.scss';

const Banner = ({ restaurant }) => (
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
            alt={restaurant?.name}
            src={restaurant?.image || Logo}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
