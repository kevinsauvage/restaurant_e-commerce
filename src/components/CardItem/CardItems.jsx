import { useDispatch } from 'react-redux';
import Image from 'next/image';

import { iconCart, iconLess, iconMore } from '../../assets/images/svg';
import { addItem, removeItem } from '../../store/cart/action';
import { addSelectedItem } from '../../store/user/action';

import styles from './CardItems.module.scss';

const CardItems = ({ item, quantity }) => {
  const dispach = useDispatch();

  const handleAddItem = (event) => {
    event.stopPropagation();
    dispach(addItem(item, 1));
  };

  const handleRemoveItem = (event) => {
    event.stopPropagation();
    dispach(removeItem(item));
  };

  return (
    <div className={styles.CardItems} role="presentation">
      <div className={styles.details}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.price}>{item.price}€</p>
        {quantity ? (
          <div className={styles.quantity}>
            <button type="button" onClick={(event) => handleRemoveItem(event)}>
              {iconLess}
            </button>
            <p>{quantity}</p>
            <button type="button" onClick={(event) => handleAddItem(event)}>
              {iconMore}
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
