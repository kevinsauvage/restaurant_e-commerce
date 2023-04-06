import { MdAdd, MdOutlineShoppingCart, MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

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
    <div
      className={styles.CardItems}
      role="presentation"
      onClick={() => dispach(addSelectedItem(item))}
    >
      <div className={styles.details}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.description}>{`${
          item.description.length > 60 ? `${item.description.slice(0, 60)}...` : item.description
        }`}</p>
        <p className={styles.price}>{item.price}€</p>
      </div>
      <div className={styles.image}>
        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
        {quantity ? (
          <div className={styles.quantity}>
            <MdRemove onClick={(event) => handleRemoveItem(event)} />
            <p>{quantity}</p>
            <MdAdd onClick={(event) => handleAddItem(event)} />
          </div>
        ) : (
          <button type="submit" className={styles.addBtn} onClick={handleAddItem}>
            <MdOutlineShoppingCart /> Add
          </button>
        )}
      </div>
    </div>
  );
};

export default CardItems;
