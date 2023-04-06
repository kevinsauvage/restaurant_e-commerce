import { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import useTotalPrice from '../../hooks/useTotalPrice';
import { addItem } from '../../store/cart/action';
import { addSelectedItem } from '../../store/user/action';
import Button from '../Button/Button';

import styles from './cardItemBig.module.scss';

const CardItemBig = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const total = useTotalPrice([{ product: item, quantity }]);

  const updateQuantity = (event, newQ) => {
    event.stopPropagation();
    if (newQ < 1) return;
    return setQuantity(newQ);
  };

  const handleAddToCart = () => {
    dispatch(addItem(item, quantity));
    dispatch(addSelectedItem());
  };

  return (
    <div className={styles.card} onClick={(event) => event.stopPropagation()} role="presentation">
      <div className={styles.img}>
        <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.detail}>
        <p className={styles.title}>{item.name}</p>
        <p className={styles.price}>{item.price}€</p>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.quantity}>
        <button
          type="submit"
          className={`${styles.quantityLess} ${quantity === 1 && styles.quantityDisabled}`}
          onClick={(event) => updateQuantity(event, quantity - 1)}
        >
          <MdRemove />
        </button>
        <p>{quantity}</p>
        <button
          type="submit"
          className={styles.quantityMore}
          onClick={(event) => updateQuantity(event, quantity + 1)}
        >
          <MdAdd />
        </button>
      </div>

      <Button
        style={styles.btn}
        text={`Add ${quantity} for ${total}€ `}
        onClick={handleAddToCart}
      />
    </div>
  );
};

export default CardItemBig;
