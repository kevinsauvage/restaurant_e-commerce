import Link from 'next/link';

import styles from './button.module.scss';

const Button = ({ href, text, onClick, style }) => (
  <button
    type="submit"
    className={`${styles.button} ${style}`}
    onClick={(event) => onClick?.(event)}
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

export default Button;
