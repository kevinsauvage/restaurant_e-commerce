import styles from './Container.module.scss';

const Container = ({ children, style }) => (
  <div className={`${styles.Container} ${style}`}>{children}</div>
);

export default Container;
