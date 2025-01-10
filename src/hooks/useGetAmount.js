import { useEffect, useState } from "react";
import { supabase } from "../services/API/supabase";
import { useUser } from "./useUser";

function useGetAmount() {
  const { user, isLoading } = useUser();
  const [amount, setAmount] = useState("");
  useEffect(() => {
    async function getAmount() {
      const { data, error } = await supabase
        .from("USD_BALANCE")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("There was an error fetching balance:", error.message);
        return;
      }

      if (data?.length > 0) {
        setAmount(data[0].balance);
      }
    }

    if (!isLoading && user?.id) {
      getAmount();
    }
  }, [user, isLoading]); // Include `isLoading` in dependencies
  return { amount };
}

export default useGetAmount;
