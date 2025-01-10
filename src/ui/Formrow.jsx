import styles from "../modules/Form.module.css";

function Formrow({ name, children, errors, id }) {
  return (
    <div className={styles.formRow}>
      {name && <label htmlFor={name}>{name}</label>}
      {children}
      {errors && <span className={styles.error}>{errors?.[id]?.message}</span>}
    </div>
  );
}

export default Formrow;
