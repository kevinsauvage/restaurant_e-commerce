import Image from 'next/image';
import { MdOutlineShoppingCart, MdAdd, MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../store/cart/action';
import { addSelectedItem } from '../../store/user/action';
import styles from './CardItems.module.scss';

function CardItems({ item, quantity }) {
  const dispach = useDispatch();

  const handleAddItem = (e) => {
    e.stopPropagation();
    dispach(addItem(item, 1));
  };

  const handleRemoveItem = (e) => {
    e.stopPropagation();
    dispach(removeItem(item));
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={styles.CardItems}
      role="button"
      tabIndex={0}
      onClick={() => dispach(addSelectedItem(item))}
    >
      <div className={styles.details}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.description}>{`${
          item.description.length > 60
            ? `${item.description.substring(0, 60)}...`
            : item.description
        }`}</p>
        <p className={styles.price}>{item.price}€</p>
      </div>
      <div className={styles.image}>
        <Image src={item.image} layout="fill" objectFit="cover" />
        {quantity ? (
          <div className={styles.quantity}>
            <MdRemove onClick={(e) => handleRemoveItem(e)} />
            <p>{quantity}</p>
            <MdAdd onClick={(e) => handleAddItem(e)} />
          </div>
        ) : (
          <button
            type="submit"
            className={styles.addBtn}
            onClick={handleAddItem}
          >
            <MdOutlineShoppingCart /> Add
          </button>
        )}
      </div>
    </div>
  );
}

export default CardItems;
