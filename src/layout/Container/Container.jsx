import styles from './Container.module.scss';

function Container({ children, style }) {
  return <div className={`${styles.Container} ${style}`}>{children}</div>;
}

export default Container;
