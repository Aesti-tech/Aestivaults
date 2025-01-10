import styles from "../../modules/Artwork.module.css";
function Activity({ info }) {
  return (
    <div className={`${styles.activity}`} style={{ "--delay": ".2s" }}>
      <div>
        <h2 className={`${styles.activityLink}`}>The monalisa</h2>

        <img src={`${info.url}`} alt="" className={styles.image} />
      </div>
      <div className={styles.accountWrap}>
        <div>
          <h3 className={styles.name}>Davinci</h3>
          <p className={styles.info}>{info.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Activity;
