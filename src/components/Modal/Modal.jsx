import { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

import styles from './Modal.module.scss';

const Modal = ({ children, handleClose }) => {
  const [yPos, setYPos] = useState(0);

  useEffect(() => setYPos(window.pageYOffset), []);

  return (
    <div className={styles.modal} onClick={handleClose} role="presentation">
      <div className={styles.inner} style={{ top: yPos + 60 }}>
        <button onClick={handleClose} className={styles.btnClose} type="button">
          <MdOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
