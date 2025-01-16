import Modal, { useModal } from "../../../ui/Modal";

import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../services/API/supabase";
import toast from "react-hot-toast";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";

function AcceptBid({ message }) {
  const { mutate, isPending } = useAcceptBid();
  const { close } = useModal();
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    bid_details: [
      {
        NFT_token,
        bid_made,
        name,
        description,
        royalty,
        user: nameOFuser,
        owner_id,
        price,
        user_id,
        username,
      },
    ],
    image,
    subject,
    id,
  } = message;

  async function handleAccept() {
    const message = {
      id,
      price,
      image,
      user_id,

      bid_details: [
        {
          bid_Accepted: Date.now().toLocaleString(),
          price,
          owner_id,
          bid_made,
          user: nameOFuser,
          user_id,
          username,
          NFT_token,
          accepted: true,
          name,
          description,
          royalty,
          seller_user_id: user.id,
          seller_username: user.user_metadata.username,
          seller_email: user.email,
        },
      ],
    };

    mutate(message, {
      onSuccess: () => {
        close();
        navigate("/dashboard/messages");
      },
    });
  }

  // Parse bid_made from the string and format it into a Date object

  const time = bid_made.replace(/,/g, "");
  const bidDate = new Date(Number(time));
  const formattedBidDate = bidDate.toLocaleString(); // You can adjust the format as needed

  return (
    <Modal.Window name="medium">
      <div className="p-5 max-w-lg">
        <h2 className="text-xl font-semibold">{subject}</h2>
        <h4 className="font-medium text-lg">Bid Details:</h4>
        <img src={image} alt="Artwork" className="w-20 h-20 rounded-lg my-4" />

        <div className="my-4">
          <p className="text-sm">
            <strong>Bid Made On:</strong> {formattedBidDate}
          </p>
          <p className="text-sm flex gap-x-2">
            <strong>Bid Price:</strong> {price} <FaEthereum />
          </p>
          <p className="text-sm">
            <strong>Bidder:</strong> {nameOFuser} ({username})
          </p>
          <p className="text-sm">
            <strong>Bidder ID:</strong> {user_id}
          </p>

          <p className="text-sm">
            <strong>NFT Token:</strong> {NFT_token}
          </p>
        </div>
        <div className="flex justify-between mt-6">
          <button
            disabled={isPending}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            onClick={handleAccept}
          >
            {isPending ? "submitting..." : "Accept"}
          </button>
        </div>
      </div>
    </Modal.Window>
  );
}

export default AcceptBid;

function useAcceptBid() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["acceptBid"],
    mutationFn: (data) => submitBid(data),
    onSuccess: () => {
      toast.success("Bid Accepted succcessfully");
    },
  });
  return { mutate, isPending };
}

async function submitBid({ price, image, user_id, bid_details, id }) {
  const { error: messagesError } = await supabase.from("messages").insert([
    {
      sender: "Aestivaults inc.",
      subject: "Bid Accepted: Action Required",
      image,
      message: `Your bid of ${price} ETH for NFT with token id: ${bid_details[0].NFT_token}. has been accepted, please make the transfer to add the artwork to your collection`,
      user_id,
      bid_details,
    },
  ]);
  if (messagesError) throw new Error("Error updating messages", messagesError);
  const { error } = await supabase
    .from("messages")
    .update({ bid_details })
    .eq("id", id)
    .select();
  if (error) throw new Error(error);
}
