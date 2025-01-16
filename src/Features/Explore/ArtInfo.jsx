import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import styles from "../../modules/Artwork.module.css";
import Bidding from "./Bidding";

function ArtInfo({ info }) {
  const [index, setIndex] = useState(null);

  const tokens = [
    { id: 0, name: "Owner", value: info.owner_id },
    { id: 1, name: "Token", value: info.NFT_token },
  ];

  const handleCopy = (id) => {
    const text = tokens.find((item) => item.id === id)?.value;
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIndex(id);
        setTimeout(() => setIndex(null), 2000);
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  return (
    <div
      style={{ "--delay": ".4s" }}
      className={`${styles.artInfo} p-6 rounded-lg items-center space-y-6`}
    >
      <h2 className="text-1xl font-bold">NFT</h2>
      <img
        src={info.image}
        alt="NFT"
        className="h-40 w-full object-cover rounded-lg"
      />
      <div className="space-y-4 w-full max-w-md">
        <h3 className="flex text-sm gap-x-2">
          Created on:
          <span>{new Date(info.created_at).toLocaleDateString()}</span>
        </h3>
        <h3 className="flex text-sm gap-x-2">
          Blockchain:
          <span className="flex items-center">
            Ethereum <FaEthereum className="ml-1 text-blue-500" />
          </span>
        </h3>
        <h3 className="flex text-sm gap-x-2">
          Bidding Price:
          <span className="flex items-center">
            {info.price} <FaEthereum className="ml-1 text-blue-500" />
          </span>
        </h3>
        {tokens.map((item) => (
          <h3 key={item.id} className="flex text-sm items-center space-x-2">
            {item.name}:{" "}
            <span
              className="truncate w-48 cursor-pointer text-blue-400"
              onClick={() => handleCopy(item.id)}
            >
              {item.value}
            </span>
            {index === item.id && (
              <span className="text-sm text-green-500">Copied!</span>
            )}
          </h3>
        ))}
      </div>

      <Modal>
        <Modal.Open opens={"bid"}>
          <Button variations={"primary"} sizes={"medium"}>
            Place Bid
          </Button>
        </Modal.Open>
        <Bidding info={info} />
      </Modal>
    </div>
  );
}

export default ArtInfo;
