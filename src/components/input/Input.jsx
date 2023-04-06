import styles from './input.module.scss';

const Input = ({ type, label, id, onChange, name }) => (
  <label htmlFor={id} className={styles.label}>
    {label}
    <input className={styles.input} type={type} id={id} onChange={onChange} name={name} />
  </label>
);

export default Input;
