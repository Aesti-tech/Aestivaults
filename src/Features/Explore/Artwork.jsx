import { useParams } from "react-router-dom";
import styles from "../../modules/Artwork.module.css";

import Activity from "./Activity";
import ArtInfo from "./ArtInfo";
import ArtistInfo from "./ArtistInfo";
import { galleryImages } from "../../data";

function Artwork() {
  const { id } = useParams();
  const item = galleryImages.filter((item) => item.public_id === id);
  const [info] = item;

  return (
    <div className={`${styles.userBox}`}>
      <Activity info={info} />
      <ArtInfo info={info} />
      <ArtistInfo info={info} />
    </div>
  );
}

export default Artwork;
