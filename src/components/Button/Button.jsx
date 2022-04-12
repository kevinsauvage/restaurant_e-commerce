import Link from 'next/link';
import styles from './button.module.scss';

function Button({ href, text, onClick, style }) {
  return (
    <button
      type="submit"
      className={`${styles.button} ${style}`}
      onClick={(e) => (onClick ? onClick(e) : null)}
    >
      {onClick ? (
        <div>
          <p>{text}</p>
        </div>
      ) : (
        <Link href={href}>{text}</Link>
      )}
    </button>
  );
}

export default Button;
