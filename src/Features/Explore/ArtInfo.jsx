import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import styles from "../../modules/Artwork.module.css";

function ArtInfo({ info }) {
  const [index, setIndex] = useState(null);
  const tokens = [
    {
      id: 0,
      name: "Owner",
      value: "0xABC1233566DGHDHSSGSGFSXYZ7890xABC1233566DGHDHSSGSGFSXYZ789",
    },
    {
      id: 1,
      name: "Token",
      value: "0123456789ABCDEwrwerfa3244adfdF0123456789ABCDEwrwerfa3244adfdF",
    },
  ];

  const handleCopy = (id) => {
    const text = tokens.map((item) => {
      if (item.id === id) return item.value;
    });
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIndex(id);
        setTimeout(() => setIndex(null), 2000); // Reset after 2 seconds
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  return (
    <div className={styles.artInfo} style={{ "--delay": ".4s" }}>
      <h2 className={styles.heading}> NFT </h2>
      <img src={`${info.url}`} className={styles.nftImage} alt="" />

      <div className={styles.nftInfo}>
        <h3>
          Created on: <span> 2024-01-15T10:30:00Z </span>
        </h3>
        <h3>
          Blockchain:
          <span>
            Ethereum <FaEthereum />
          </span>
        </h3>
        <h3>
          Mint Fee:
          <span>
            0.05 <FaEthereum />
          </span>
        </h3>
        {tokens.map((item) => (
          <h3 key={item.id}>
            {item.name}
            <div
              onClick={() => handleCopy(item.id)}
              className={styles.overflow}
            >
              {item.value}
            </div>
            <div
              className={`${styles.notification} ${
                index === item.id ? styles.show : ""
              }`}
            >
              <p>Copied to clipboard!</p>
            </div>
          </h3>
        ))}
      </div>
    </div>
  );
}

export default ArtInfo;
