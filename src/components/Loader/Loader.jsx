import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.bars}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default Loader;
