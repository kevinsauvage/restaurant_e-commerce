import styles from './input.module.scss';

function Input({ type, label, id, onChange, name }) {
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        className={styles.input}
        type={type}
        id={id}
        onChange={onChange}
        name={name}
      />
    </label>
  );
}

export default Input;
