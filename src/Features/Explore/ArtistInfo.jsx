import styles from "../../modules/Artwork.module.css";
import { FaUserCircle } from "react-icons/fa";
import { MdPalette } from "react-icons/md";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

function ArtistInfo({ info }) {
  console.log(info.artistInfo[0]);
  return (
    <div className={styles.accountWrapper} style={{ "--delay": ".6s" }}>
      <h2 className={styles.heading}> Artist </h2>

      <div className={styles.accountProfile}>
        <img src={info.artistInfo[0].avatar} alt={`Photo of artist`} />
        <div className={styles.blobWrap}>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
        </div>
        <h2 className={styles.artistName}>{info.artist}</h2>
      </div>

      <div className={styles.account}>
        <div className={styles.sales}>
          <FaUserCircle /> username: {info.artistInfo[0].username}
        </div>

        <div className={styles.minted}>
          <MdPalette /> Royalty: {info.royalty}
        </div>

        <Link to={`/userprofile/${info.artistInfo[0].username}`}>
          <Button variations={"primary"} sizes={"medium"}>
            Profile Page <FaUserCircle />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ArtistInfo;
