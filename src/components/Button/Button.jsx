import Link from 'next/link';
import styles from './button.module.scss';

function Button({ href, text, onClick }) {
  return (
    <button type="submit" className={styles.button}>
      {onClick ? (
        <div role="button" onClick={onClick}>
          {text}
        </div>
      ) : (
        <Link href={href}>{text}</Link>
      )}
    </button>
  );
}

export default Button;
