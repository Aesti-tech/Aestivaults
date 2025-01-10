import styles from "../modules/UserDisplay.module.css";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

function UserDisplay() {
  const { user, isLoading } = useUser();
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const updateNavVisibility = () => {
      if (window.innerWidth > 830) {
        setShowName(true);
      } else {
        setShowName(false);
      }
    };

    updateNavVisibility();

    window.addEventListener("resize", updateNavVisibility);

    return () => {
      window.removeEventListener("resize", updateNavVisibility);
    };
  }, []);

  const { name, avatar } = user.user_metadata;

  const displayname = showName ? name : name.split(" ")[0];

  if (isLoading) return null;

  return (
    <Link to={"/dashboard"}>
      <div className={styles.styledUserAvatar}>
        <img
          className={styles.avatar}
          src={avatar || "/avatar.webp"}
          alt={`Avatar of ${displayname}`}
        />

        <span>{displayname}</span>
      </div>
    </Link>
  );
}

export default UserDisplay;
