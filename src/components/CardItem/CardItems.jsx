import { useDispatch } from 'react-redux';
import Image from 'next/image';

import { iconCart, iconLess, iconMore, iconTrash } from '../../assets/images/svg';
import { updateCart } from '../../store/cart/action';
import { addSelectedItem } from '../../store/user/action';

import styles from './CardItems.module.scss';

const CardItems = ({ item, quantity }) => {
  const dispach = useDispatch();

  return (
    <div className={styles.CardItems} role="presentation">
      <div className={styles.details}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.price}>{item.price}€</p>
        {quantity ? (
          <div className={styles['is-cart']}>
            <div className={styles.quantity}>
              <button type="button" onClick={() => dispach(updateCart(item, quantity - 1))}>
                {iconLess}
              </button>
              <p>{quantity}</p>
              <button type="button" onClick={() => dispach(updateCart(item, quantity + 1))}>
                {iconMore}
              </button>
            </div>
            <button
              type="button"
              className={styles.remove}
              onClick={() => dispach(updateCart(item, 0))}
            >
              {iconTrash}
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className={styles.addBtn}
            onClick={() => dispach(addSelectedItem(item))}
          >
            {iconCart} Add
          </button>
        )}
      </div>
      <div className={styles.image}>
        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default CardItems;
