import styles from "../modules/Container.module.css";

function Container({ children, head }) {
  return (
    <div className={styles.container}>
      <h2>{head} </h2>
      {children}
    </div>
  );
}

export default Container;
