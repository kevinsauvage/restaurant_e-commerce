import Image from 'next/image';
import { MdOutlineShoppingCart, MdAdd, MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../store/cart/action';
import styles from './CardItems.module.scss';

function CardItems({ item, quantity }) {
  const dispach = useDispatch();

  return (
    <div className={styles.CardItems}>
      <div className={styles.details}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.description}>{`${item.description?.substring(
          0,
          60
        )}...`}</p>
        <p className={styles.price}>{item.price}€</p>
      </div>
      <div className={styles.image}>
        <Image src={item.image} layout="fill" objectFit="cover" />
        {quantity ? (
          <div className={styles.quantity}>
            <MdRemove onClick={() => dispach(removeItem(item))} />
            <p>{quantity}</p>
            <MdAdd onClick={() => dispach(addItem(item))} />
          </div>
        ) : (
          <button
            type="submit"
            className={styles.addBtn}
            onClick={() => dispach(addItem(item))}
          >
            <MdOutlineShoppingCart /> Add
          </button>
        )}
      </div>
    </div>
  );
}

export default CardItems;
