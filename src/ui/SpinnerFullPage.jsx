import styles from "../modules/SpinnerFullPage.module.css";

function SpinnerFullPage() {
  return (
    <div className={styles.spinner}>
      <div className={styles.fullPageSpinner}></div>
      <img src="/logo.png" className={styles.image} />
    </div>
  );
}

export default SpinnerFullPage;
