import styles from "../modules/Button.module.css";

function Button({ children, sizes, variations, ...rest }) {
  return (
    <button
      className={`${styles.button} ${styles[variations]} ${styles[sizes]}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
