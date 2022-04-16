import { useEffect, useState } from 'react';
import styles from './Modal.module.scss';

function Modal({ children, handleClose }) {
  const [yPos, setYPos] = useState(0);

  useEffect(() => setYPos(window.pageYOffset), []);

  return (
    <div className={styles.modal} onClick={handleClose} role="presentation">
      <div className={styles.inner} style={{ top: yPos + 60 }}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
