import { useState, useEffect } from "react";
import styles from "../../modules/Explore.module.css";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import Button from "../../ui/Button";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import useFetchData from "../../hooks/useFetchData";
import { supabase } from "../../services/API/supabase";
import { useUser } from "../../hooks/useUser";
import { dislike, like } from "../../services/Like";

function Explore() {
  const { data, isLoading } = useFetchData("gallery");
  const { user } = useUser();
  const [showLike, setShowLike] = useState({});
  const [likeStatuses, setLikeStatuses] = useState({}); // Track like statuses

  // Fetch the like status for each photo when the component mounts
  useEffect(() => {
    async function fetchLikeStatuses() {
      if (!data || !user) return;

      const statuses = {};
      for (const item of data) {
        const { data: likeData, error } = await supabase
          .from("likes")
          .select("*")
          .eq("photo_id", item.id)
          .eq("user_id", user.id);

        if (error) {
          console.error(error);
          continue;
        }

        statuses[item.id] = likeData.length > 0; // True if the user has liked this photo
      }
      setLikeStatuses(statuses);
    }

    fetchLikeStatuses();
  }, [data, user]); // Refetch whenever `data` or `user` changes

  const triggerAnimation = (id) => {
    setShowLike((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setShowLike((prev) => ({ ...prev, [id]: false }));
    }, 1000);
  };

  const handleLike = async (id) => {
    const isLiked = likeStatuses[id];

    if (isLiked) {
      // User has already liked; remove the like
      const { error } = await supabase
        .from("likes")
        .delete()
        .match({ photo_id: id, user_id: user.id });

      if (error) throw new Error(error);

      dislike(id);
    } else {
      // User has not liked; add a like
      const { error } = await supabase
        .from("likes")
        .insert({ photo_id: id, user_id: user.id });

      if (error) throw new Error(error);

      like(id);
      triggerAnimation(id);
    }

    // Update the like status locally
    setLikeStatuses((prev) => ({ ...prev, [id]: !isLiked }));
  };

  if (isLoading) return <SpinnerFullPage />;

  return (
    <div className={styles.exploreContainer}>
      <h2>Explore extraordinary artworks crafted by talented creators.</h2>

      <section className={styles.grid}>
        {data?.map((item, index) => (
          <div
            onDoubleClick={(e) => {
              e.preventDefault();
              handleLike(item.id);
            }}
            key={item.id}
            className={styles.card}
            style={{
              backgroundImage: `url(${item.image})`,
              "--delay": `.${2 + index}s`,
            }}
          >
            {showLike[item.id] && (
              <div className={styles.likeAnimation}>❤️</div>
            )}

            <Link to={`/artwork/${item.id}`} className={styles.buttonContainer}>
              <Button variations={"primary"} sizes={"medium"}>
                More info <FiInfo />
              </Button>
            </Link>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleLike(item.id);
              }}
              className={`${styles.like} ${
                likeStatuses[item.id] ? styles.active : ""
              }`}
            >
              {likeStatuses[item.id] ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Explore;
