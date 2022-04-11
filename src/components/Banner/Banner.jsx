import Image from 'next/image';
import styles from './Banner.module.scss';
import BannerImage from '../../assets/images/banner.jpg';
import Logo from '../../assets/images/logo.png';

function Banner() {
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
          <Image src={Logo} layout="fill" objectFit="scale-down" />
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>CHEZ LOUIS</h1>
        <h2 className={styles.subtitle}>
          20 Rue Saint-Martin, 75004 Paris, France
        </h2>
      </div>
    </div>
  );
}

export default Banner;
