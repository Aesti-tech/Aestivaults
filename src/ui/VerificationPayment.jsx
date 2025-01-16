import { useState } from "react";
import { useDarkMode } from "../hooks/DarkModeContext";
import useGetAmount from "../hooks/useGetAmount";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../utils/helpers";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import toast from "react-hot-toast";
import { supabase } from "../services/API/supabase";
import { useUser } from "../hooks/useUser";

function VerificationPayment() {
  const { isDarkMode } = useDarkMode();
  const { amount } = useGetAmount();
  const { createTransaction, isPending } = useCreateTransaction();
  const { user } = useUser();
  const { user_metadata } = user;
  const { id } = useParams();
  const paymentAmount = id === "Gold" ? 200 : id === "Platinum" ? 500 : 1000;
  const [autoRenew, setAutoRenew] = useState(false);
  const isPaymentPossible = amount >= paymentAmount;

  const handlePayment = async () => {
    if (amount <= paymentAmount) return;

    if (!user_metadata.verified) {
      const { error: bre } = await supabase.auth.updateUser({
        data: {
          verified: id,
        },
      });

      if (bre) throw new Error(bre.message);
    }

    if (user_metadata?.verified === id) {
      toast.error(`you are already a ${id} verifed user `);
      return;
    }

    createTransaction(
      {
        amount: paymentAmount,
        type: "verification payment",
        details: [],
      },
      {
        onSuccess: () => {
          toast.success("Verification payment Complete");
        },
      }
    );

    const { error } = await supabase
      .from("USD_BALANCE")
      .update({ balance: Number(amount) - paymentAmount })
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);
  };

  console.log(user_metadata);

  return (
    <div
      className={`max-w-2xl mx-auto my-12 p-8 rounded-xl shadow-2xl ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        Verification Payment
      </h1>
      <div className="text-lg space-y-4">
        <div className="flex justify-between">
          <span>Wallet Balance:</span>
          <span className="font-semibold">{formatCurrency(amount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Payment Amount:</span>
          <span className="font-semibold">${paymentAmount}</span>
        </div>
      </div>
      <div
        className={`text-xl font-semibold text-center my-6 ${
          isPaymentPossible ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPaymentPossible
          ? "You can proceed with the payment."
          : "Insufficient balance to make the payment."}
      </div>
      <div className="flex items-center space-x-3 mb-6">
        <input
          type="checkbox"
          id="autoRenew"
          className="h-5 w-5"
          checked={autoRenew}
          onChange={() => setAutoRenew((prev) => !prev)}
        />
        <label htmlFor="autoRenew" className="text-lg">
          Enable Auto-Renew for Future Payments
        </label>
      </div>
      <button
        onClick={handlePayment}
        disabled={!isPaymentPossible}
        className={`w-full py-3 text-xl rounded-lg font-bold transition-colors ${
          isPaymentPossible
            ? isDarkMode
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isPending ? "Proccessing Payment..." : "Make Payment"}
      </button>
    </div>
  );
}

export default VerificationPayment;
