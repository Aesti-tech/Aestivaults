import { useParams } from "react-router-dom";
import styles from "../../modules/Artwork.module.css";

import Activity from "./Activity";
import ArtInfo from "./ArtInfo";
import ArtistInfo from "./ArtistInfo";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import useFetchData from "../../hooks/useFetchData";

function Artwork() {
  const { id } = useParams();
  const { data, isLoading } = useFetchData("gallery", {
    column: "id",
    value: id,
  });

  if (isLoading) return <SpinnerFullPage />;
  const [info] = data ?? {};

  return (
    <div className={`${styles.userBox}`}>
      <Activity info={info} />
      <ArtInfo info={info} />
      <ArtistInfo info={info} />
    </div>
  );
}

export default Artwork;
