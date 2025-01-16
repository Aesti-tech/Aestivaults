import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../services/API/supabase";
import toast from "react-hot-toast";

function useBid() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["bidding"],
    mutationFn: (data) => submitBid(data),
    onSuccess: () => {
      toast.success("Bid submitted succcessfully");
    },
  });
  return { mutate, isPending };
}

export default useBid;

async function submitBid({ image, user_id, bid_details }) {
  const { error: messagesError } = await supabase.from("messages").insert([
    {
      sender: "Aestivaults inc.",
      subject: "New Bid Received: Action Required",
      image,

      message: `You have just received a bid of ${bid_details[0].price} ETH for your listing. If you find this offer acceptable, please click on the Approve button to complete the transaction. Upon approval:
        The bid amount will be transferred to your balance.
  Ownership of the listing will be transferred to the bidder.
  If the offer does not meet your expectations, you can choose to Reject the bid.
  
  Thank you for using our platform!`,
      user_id,
      bid_details,
    },
  ]);

  if (messagesError) throw new Error("Error updating messages", messagesError);
}
