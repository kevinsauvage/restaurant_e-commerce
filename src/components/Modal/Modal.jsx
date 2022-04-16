import { useEffect, useState } from 'react';
import styles from './Modal.module.scss';

function Modal({ children, handleClose }) {
  const [yPos, setYPos] = useState(0);

  useEffect(() => setYPos(window.pageYOffset), []);

  const handleKeyDown = (e) => e.key === 'c' && handleClose();

  return (
    <div
      className={styles.modal}
      onClick={handleClose}
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyDown}
    >
      <div className={styles.inner} style={{ top: yPos + 60 }}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
