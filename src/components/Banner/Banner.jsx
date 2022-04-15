import Image from 'next/image';
import styles from './Banner.module.scss';
import BannerImage from '../../assets/images/banner.jpg';
import Logo from '../../assets/images/logo.png';

function Banner({ restaurant }) {
  return (
    <div className={styles.Banner}>
      <div className={styles.BannerImg}>
        <Image
          src={BannerImage}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />

        <div className={styles.logo}>
          <div>
            <Image
              src={restaurant?.image || Logo}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{restaurant?.name || 'UpToGo'}</h1>
        <h2 className={styles.subtitle}>
          {restaurant?.address || 'Ordering your favorite foud made easy'}
        </h2>
      </div>
    </div>
  );
}

export default Banner;
