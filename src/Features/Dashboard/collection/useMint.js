import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MintArtWork } from "../../../services/Authentication/auth";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { supabase } from "../../../services/API/supabase";
import { useCreateTransaction } from "../../../hooks/useCreateTransaction";
import { currentPrice, getFormattedTimestamp } from "../../../utils/helpers";
import { useEffect, useState } from "react";

function useMint() {
  const queryClient = useQueryClient();
  const { createTransaction } = useCreateTransaction();
  const [ethereumPrice, setEthereumPrice] = useState(0);

  useEffect(() => {
    async function getPrice() {
      const eth = await currentPrice();
      setEthereumPrice(eth);
    }

    getPrice();
  }, []);
  const { id } = useParams();

  const mintFee = 0.15 * ethereumPrice;
  const price = mintFee.toFixed(2);

  const transferData = {
    amount: price,
    type: "Minted Artwork",
    details: [
      {
        type: "mint artwork",
        date: getFormattedTimestamp(),
      },
    ],
  };

  const { data, isLoading } = useQuery({
    queryKey: ["collect"],
    queryFn: () => FetchCollection(id),
  });

  const { mutate: mintArt, isPending } = useMutation({
    mutationFn: (data) => MintArtWork(data),
    mutationKey: ["create collection"],
    onSuccess: () => {
      toast.success("image minted successfully");
      queryClient.invalidateQueries({ active: true });

      createTransaction(transferData);
    },
  });

  return { mintArt, data, isLoading, isPending };
}

export { useMint };

const FetchCollection = async (id) => {
  let { data: collections, error } = await supabase
    .from("collections")
    .select("images")
    .eq("id", id);
  const [datanew] = collections;

  if (error) throw new Error(error.message, "there was an error");

  return datanew;
};
