import Link from 'next/link';

import styles from './button.module.scss';

const Button = ({ href, text, onClick, svg, style }) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={`${styles.button} ${style}`}>
          <p>
            {svg} {text}
          </p>
        </a>
      </Link>
    );
  }

  return (
    <button
      type="submit"
      className={`${styles.button} ${style}`}
      onClick={(event) => onClick?.(event)}
    >
      <p>
        {svg} {text}
      </p>
    </button>
  );
};

export default Button;
