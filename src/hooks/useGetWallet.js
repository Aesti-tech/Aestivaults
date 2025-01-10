import { supabase } from "../services/API/supabase";
import { useQuery } from "@tanstack/react-query";

function useGetWallet() {
  const { data, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: useGetWallet,
  });

  async function useGetWallet() {
    const { data, error } = await supabase
      .from("wallet")
      .select("*")
      .eq("id", 1);

    if (error) {
      console.error("There was an error fetching wallet:", error.message);
    }
    return data;
  }

  return { data, isLoading };
}

export default useGetWallet;
