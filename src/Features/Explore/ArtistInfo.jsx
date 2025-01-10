import styles from "../../modules/Artwork.module.css";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import { MdPalette } from "react-icons/md";
import Button from "../../ui/Button";

function ArtistInfo({ info }) {
  return (
    <div className={styles.accountWrapper} style={{ "--delay": ".6s" }}>
      <h2 className={styles.heading}> Artist </h2>

      <div className={styles.accountProfile}>
        <img src={info.url} alt={`Photo of`} />
        <div className={styles.blobWrap}>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
        </div>
        <h2 className={styles.artistName}>Mike J Morgan</h2>
      </div>

      <div className={styles.account}>
        <div className={styles.location}>
          <FaMapMarkerAlt /> Based in California
        </div>
        <div className={styles.sales}>
          <AiOutlineLineChart /> Over 30 sales
        </div>
        <div className={styles.minted}>
          <MdPalette /> 50+ minted artworks
        </div>

        <Button variations={"primary"} sizes={"medium"}>
          Profile Page <FaUserCircle />
        </Button>
      </div>
    </div>
  );
}

export default ArtistInfo;
