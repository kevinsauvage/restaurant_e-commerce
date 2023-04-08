import { MdOutlineClose } from 'react-icons/md';

import useHideScrollbar from '../../hooks/useHideScrollbar';

import styles from './Modal.module.scss';

const Modal = ({ children, handleClose }) => {
  useHideScrollbar();
  return (
    <div className={styles.modal} onClick={handleClose} role="presentation">
      <div className={styles.inner}>
        <button onClick={handleClose} className={styles.btnClose} type="button">
          <MdOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
