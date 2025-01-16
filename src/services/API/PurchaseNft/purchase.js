import toast from "react-hot-toast";
import { supabase } from "../supabase";
import { getCurrentUser } from "../../Authentication/auth";
import { currentPrice } from "../../../utils/helpers";

export async function getGallery(NFT_token, owner_id) {
  try {
    const { data: gallery, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("NFT_token", NFT_token)
      .eq("owner_id", owner_id);

    if (error) throw new Error("Error fetching gallery: " + error.message);

    const [formergalleryData] = gallery;
    if (!formergalleryData) {
      toast.error(
        "Ownership has changed; this artwork was purchased by someone else."
      );
      throw new Error("Item has been bought.");
    }
    return formergalleryData;
  } catch (error) {
    console.error("getGallery Error: ", error.message);
    throw error;
  }
}
export async function updateCollection(newImage, id) {
  try {
    const { data: collections, error } = await supabase
      .from("collections")
      .select("images")
      .eq("id", id);

    if (error) throw new Error("Error fetching collections: " + error.message);

    const updatedImages = collections[0]?.images || [];
    updatedImages.push(newImage);

    const { error: updateError } = await supabase
      .from("collections")
      .update({ images: updatedImages })
      .eq("id", id);

    if (updateError)
      throw new Error(
        "Error updating collection images: " + updateError.message
      );
  } catch (error) {
    console.error("updateCollection Error: ", error.message);
    throw error;
  }
}

export async function updateGallery(FormerOwnerID, user, formergalleryData) {
  try {
    const { error } = await supabase
      .from("gallery")
      .update({
        owner_user_id: user.id,
        owner_id: user.user_metadata.owner_nft_id,
        bids: [
          ...(formergalleryData.bids || []),
          {
            former_owner_id: FormerOwnerID,
            current_owner_id: user.user_metadata.owner_nft_id,
            sold: new Date().toLocaleString(),
          },
        ],
      })
      .eq("id", formergalleryData.id);

    if (error)
      throw new Error("Error updating gallery owner: " + error.message);
  } catch (error) {
    console.error("updateGallery Error: ", error.message);
    throw error;
  }
}
export async function updateTransactions(data, price, user, seller) {
  try {
    const transactions = [
      {
        amount: Number(data * price),
        type: "NFT purchase",
        status: "APPROVED",
        username: user.user_metadata.username,
        user_email: user.email,
        user_id: user.id,
        reference_id: `REF-${Math.floor(Math.random() * 2000)}`,
        transaction_id: `TRN-${Math.floor(Math.random() * 2000)}`,
        details: [],
      },
      {
        amount: Number(data * price),
        type: "NFT sale",
        status: "APPROVED",
        username: seller.seller_username,
        user_email: seller.seller_email,
        user_id: seller.seller_user_id,
        reference_id: `REF-${Math.floor(Math.random() * 2000)}`,
        transaction_id: `TRN-${Math.floor(Math.random() * 2000)}`,
        details: [],
      },
    ];

    const { error } = await supabase.from("Transactions").insert(transactions);

    if (error) throw new Error("Error creating transactions: " + error.message);
  } catch (error) {
    console.error("updateTransactions Error: ", error.message);
    throw error;
  }
}

export async function updateBalance(data, price, user, seller) {
  const { seller_user_id } = seller;

  let { data: USD_BALANCE, error: usd_error } = await supabase
    .from("USD_BALANCE")
    .select("user_id, balance")
    .in("user_id", [user.id, seller_user_id]);

  if (usd_error) {
    console.error(usd_error.message);
    throw new Error(usd_error);
  }

  const buyerBalance =
    USD_BALANCE.find((b) => b.user_id === user.id)?.balance || 0;
  const sellerBalance =
    USD_BALANCE.find((b) => b.user_id === seller_user_id)?.balance || 0;

  const { error: updateBuyerBalanceError } = await supabase
    .from("USD_BALANCE")
    .update({ balance: buyerBalance - Number(data * price) })
    .eq("user_id", user.id);

  if (updateBuyerBalanceError) {
    console.error(updateBuyerBalanceError.message);
    throw new Error(updateBuyerBalanceError);
  }

  const { error: updateSellerBalanceError } = await supabase
    .from("USD_BALANCE")
    .update({ balance: String(Number(sellerBalance) + Number(data * price)) })
    .eq("user_id", seller_user_id);

  if (updateSellerBalanceError) {
    console.error(updateSellerBalanceError.message);
    throw new Error(updateSellerBalanceError);
  }
}

export async function handlePurchase({ userData, amount, message_id }) {
  const user = await getCurrentUser();
  const EthereumPrice = await currentPrice();

  let { data: message, error: errorMessage } = await supabase
    .from("messages")
    .select("*")
    .eq("id", message_id);

  if (errorMessage) {
    console.error(errorMessage.message);
    throw new Error(errorMessage.message);
  }

  const {
    bid_details: [
      {
        NFT_token,
        price,
        owner_id,
        name,
        royalty,
        seller_user_id,
        seller_username,
        description,
        seller_email,
      },
    ],
    image,
  } = message[0];

  if (amount < Number(EthereumPrice * price)) {
    toast.error("You do not have enough balance to make this purchase");
    console.error("insufficient balance");
    throw new Error("insufficient balance!");
  }

  const formergalleryData = await getGallery(NFT_token, owner_id);

  const newImage = {
    id: `${Math.random() * 100}${user.id}`,
    type: "Purchased Art",
    name: name,
    alt: description || "",
    royalty: royalty || "0%",
    url: image,
    NFT_token,
  };

  await updateCollection(newImage, userData.id);

  await updateGallery(owner_id, user, formergalleryData);

  const seller = { seller_username, seller_email, seller_user_id };
  await updateTransactions(EthereumPrice, price, user, seller);

  await updateBalance(EthereumPrice, price, user, seller);
}
