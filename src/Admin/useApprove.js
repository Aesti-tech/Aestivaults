import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "../services/API/supabase";
import useFetchData from "../hooks/useFetchData";
import { getFormattedTimestamp } from "../utils/helpers";

function useApprove() {
  const queryClient = useQueryClient();
  const { data: pendingData } = useFetchData("Transactions");
  const { data: usdBalance } = useFetchData("USD_BALANCE");

  async function ApprovePayment(id) {
    const toApprove = pendingData.filter((item) => item.id === id);
    const [approveData] = toApprove;

    const present = usdBalance.some(
      (item) => item.user_id === approveData.user_id
    );

    if (present) {
      let { data: USD_BALANCE, error } = await supabase
        .from("USD_BALANCE")
        .select("balance")
        .eq("user_id", approveData.user_id);

      if (error) throw new Error(error);

      const [{ balance }] = USD_BALANCE;

      const newBalance = Number(approveData.amount) + Number(balance);
      const bal = String(newBalance);

      const { error: updateUsdError } = await supabase
        .from("USD_BALANCE")
        .update({ balance: bal })
        .eq("user_id", approveData.user_id);

      if (updateUsdError) console.error("Error fetching data:", updateUsdError);
    } else {
      const { error: createBalanceError } = await supabase
        .from("USD_BALANCE")
        .insert([
          {
            balance: approveData.amount,
            email: approveData.user_email,
            user_id: approveData.user_id,
          },
        ]);

      if (createBalanceError)
        console.error("Error fetching data:", createBalanceError);
    }

    const { error } = await supabase
      .from("Transactions")
      .update({
        status: "APPROVED",
        approved_at: String(getFormattedTimestamp()),
      })
      .eq("id", approveData.id)
      .select();

    if (error) console.error("Error fetching data:", error);
  }

  const { mutate: approvePay, isPending } = useMutation({
    mutationKey: ["approve"],
    mutationFn: (id) => ApprovePayment(id),
    onSuccess: () => {
      toast.success("Deposit Approved");
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { approvePay, isPending };
}

export default useApprove;
