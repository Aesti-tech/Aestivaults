import { useState } from "react";
import Modal, { useModal } from "../../ui/Modal";
import { FaEthereum } from "react-icons/fa";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { useDarkMode } from "../../hooks/DarkModeContext";
import useGetAmount from "../../hooks/useGetAmount";
import useGetEthPrice from "../../hooks/useGetEthPrice";
import { useUser } from "../../hooks/useUser";
import useBid from "./useBid";

function Bidding({ info }) {
  const { close } = useModal();
  const { isDarkMode } = useDarkMode();
  const { amount } = useGetAmount();
  const { data: ethPrice, isLoading } = useGetEthPrice();
  const [bidPrice, setBidPrice] = useState("");
  const { user } = useUser();
  const { mutate, isPending } = useBid();

  const handleSubmitBid = (e) => {
    e.preventDefault();
    if (!bidPrice) return toast.error("Please enter a valid bid price.");

    const artPrice = bidPrice * ethPrice;
    if (artPrice > amount)
      return toast.error("you do not have enough balance for this bid");

    if (info.owner_user_id === user.id)
      return toast.error("you can not place a bid on your own listing!!");

    const message = {
      image: info.image,
      user_id: info.owner_user_id,
      bid_details: [
        {
          user: user.user_metadata.name,
          username: user.user_metadata.username,
          bid_made: Date.now().toLocaleString(),
          user_id: user.id,
          price: bidPrice,
          owner_id: info.owner_id,
          NFT_token: info.NFT_token,
          name: info.name,
          description: info.description,
          royalty: info.royalty,
          accepted: false,
        },
      ],
    };

    mutate(message, {
      onSuccess: () => {
        close();
      },
    });
  };

  if (isLoading) return null;

  return (
    <Modal.Window name={"bid"}>
      <form onSubmit={handleSubmitBid} className={`rounded-lg space-y-4 p-4`}>
        <h3 className="text-xl font-bold">Place Your Bid</h3>
        <p className="flex gap-x-2">
          Initial Price:
          <span className="font-semibold flex items-center">
            {info.price} <FaEthereum className="ml-1 text-blue-500" />
          </span>
        </p>
        <div className="space-y-2">
          <label
            htmlFor="bid"
            className={`block text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Your Bid (ETH)
          </label>
          <input
            type="number"
            id="bid"
            name="bid"
            placeholder="Enter your bid"
            value={bidPrice}
            onChange={(e) => setBidPrice(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 focus:ring-blue-500"
                : "bg-gray-100 border-gray-300 focus:ring-blue-500"
            }`}
          />
        </div>
        <div className="flex justify-between gap-x-2 items-center">
          <Button
            onClick={close}
            variations={"secondary"}
            sizes={"small"}
            type="button"
          >
            Cancel
          </Button>
          <Button variations={"primary"} sizes={"small"} type="submit">
            {isPending ? "submitting..." : "Submit Bid"}
          </Button>
        </div>
      </form>
    </Modal.Window>
  );
}

export default Bidding;
