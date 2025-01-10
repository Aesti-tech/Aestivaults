import { useState } from "react";
import styles from "../../modules/Explore.module.css";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import Button from "../../ui/Button";
import { galleryImages } from "../../data";

function Explore() {
  const [array, setArray] = useState(galleryImages);
  const [showLike, setShowLike] = useState({});

  const handleLike = (id) => {
    const newArray = array.map((item) => {
      if (item.public_id === id) {
        if (!item.like) {
          triggerAnimation(id); // Trigger the animation
        }
        return {
          ...item,
          like: item.like ? false : true, // Toggle like
        };
      } else {
        return item;
      }
    });

    setArray(newArray);
  };

  const triggerAnimation = (id) => {
    setShowLike((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setShowLike((prev) => ({ ...prev, [id]: false }));
    }, 1000);
  };

  return (
    <div className={styles.exploreContainer}>
      <h2>Explore extraordinary artworks crafted by talented creators. </h2>

      <section className={styles.grid}>
        {array.map((items, index) => (
          <div
            onDoubleClick={(e) => {
              e.preventDefault(), handleLike(items.public_id);
            }}
            key={items.public_id}
            className={styles.card}
            style={{
              backgroundImage: `url(${items.url})`,
              "--delay": `.${2 + index}s`,
            }}
          >
            {showLike[items.public_id] && (
              <div className={styles.likeAnimation}>❤️</div>
            )}

            <Link
              to={`/artwork/${items.public_id}`}
              className={styles.buttonContainer}
            >
              <Button variations={"primary"} sizes={"medium"}>
                More info <FiInfo />
              </Button>
            </Link>

            <button
              onClick={(e) => {
                e.preventDefault(), handleLike(items.public_id);
              }}
              className={`${styles.like} ${items.like ? styles.active : ""}`}
            >
              {items.like ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Explore;
