import { Link, useLocation } from "react-router-dom";
import styles from "../modules/PurchaseNft.module.css";
import useFetchData from "../hooks/useFetchData";
import { useUser } from "../hooks/useUser";
import SpinnerFullPage from "./SpinnerFullPage";
import { useDarkMode } from "../hooks/DarkModeContext";
import Modal from "./Modal";
import Button from "./Button";
import useGetAmount from "../hooks/useGetAmount";

import { FaEthereum } from "react-icons/fa";
import { formatCurrency } from "../utils/helpers";
import { usePurchase } from "../services/API/PurchaseNft/usePurchase";
import useGetEthPrice from "../hooks/useGetEthPrice";

function PurchaseNft() {
  const { user } = useUser();
  const { isDarkMode } = useDarkMode();
  const { data, isLoading } = useFetchData("collections", {
    column: "userid",
    value: user.id,
  });

  if (isLoading) return <SpinnerFullPage />;

  return (
    <div className={`min-h-screen px-4 py-8`}>
      <h2 className={`text-xl font-semibold text-center mb-6`}>
        Please select a collection to add this artwork to
      </h2>

      {data.length === 0 ? (
        <Nocollection isDarkMode={isDarkMode} />
      ) : (
        <CollectionList isDarkMode={isDarkMode} data={data} />
      )}
    </div>
  );
}

export default PurchaseNft;

function Nocollection({ isDarkMode }) {
  return (
    <div className="text-center h-64 my-auto flex items-center flex-col justify-center">
      <h2
        className={`text-lg ${
          isDarkMode ? "text-white" : "text-black"
        } font-medium mb-4`}
      >
        You have no collections. Please go create one.
      </h2>
      <Link
        to={"/dashboard/collection"}
        className={`inline-block px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
          isDarkMode
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-blue-700 text-white hover:bg-blue-800"
        }`}
      >
        Create Collections
      </Link>
    </div>
  );
}

function CollectionList({ isDarkMode, data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item.id}
          className={`rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 ${
            isDarkMode
              ? "bg-blue-400 hover:bg-blue-700"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          <img
            src={item.featuredimage}
            alt={`Featured image of ${item.collectionName}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 pb-0">
            <h2
              className={`text-lg font-medium ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {item.collectionName}
            </h2>
            <Modal>
              <Modal.Open opens={"nftpurchase"}>
                <Button variations={"primary"} sizes={"medium"}>
                  Add Nft
                </Button>
              </Modal.Open>
              <ApprovePurchase
                userData={{ id: item.id, user_id: item.userid }}
              />
            </Modal>
          </div>
        </div>
      ))}
    </div>
  );
}

function ApprovePurchase({ userData }) {
  const { mutate, isPending } = usePurchase();
  const { data: EthereumPrice, isLoading } = useGetEthPrice();
  const { amount } = useGetAmount();
  const location = useLocation();

  const { data: message, isLoading: loadingMessages } = useFetchData(
    "messages",
    {
      column: "id",
      value: location?.state?.id,
    }
  );

  function handlePurchase() {
    const data = { userData, amount, message_id: location.state.id };
    mutate(data);
  }

  if (isLoading || loadingMessages) return null;
  const {
    bid_details: [{ NFT_token, price, name }],
    image,
  } = message[0];

  return (
    <Modal.Window name={"nftpurchase"}>
      <div className={styles.purchase}>
        <h2>Confirm purchase of NFT</h2>
        <h3 className="flex gap-x-2 items-center">
          Purchase Price: {price}
          <FaEthereum />
        </h3>

        <h4 className="text-sm font-bold">Token ID: {NFT_token}</h4>

        <div>
          <p className="text-sm py-2">
            Purchase of this NFT will move its owner ID to you on the
            blockchain, meaning only you will be able to make a resale. If there
            is a royalty on the artwork, it will be deducted from each resale.
            If you accept, please click on the purchase button, and the purchase
            amount will be deducted from your balance, and the artwork will be
            added to the chosen collection.
          </p>
        </div>

        <div className={styles.imageContainer}>
          <p>Name: {name}</p>
          <img src={image} alt="" className={styles.image} />
        </div>

        <Button onClick={handlePurchase} variations="primary" sizes="medium">
          {isPending
            ? "confirming purchase....."
            : `Purchase for ${formatCurrency(Number(EthereumPrice * price))}`}
        </Button>

        <Button
          type="reset"
          onClick={close}
          variations="secondary"
          sizes="medium"
        >
          Close
        </Button>
      </div>
    </Modal.Window>
  );
}
