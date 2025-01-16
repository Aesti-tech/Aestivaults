import { useState } from "react";
import { supabase } from "../services/API/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useFetchData from "../hooks/useFetchData";

function ApprovedRequests() {
  const [expandedRow, setExpandedRow] = useState(null);
  const { data, isLoading } = useFetchData("Transactions");
  const queryClient = useQueryClient();

  const { mutate: reversePay, isPending } = useMutation({
    mutationKey: ["reversed"],
    mutationFn: (id) => reversePayment(id),
    onSuccess: () => {
      toast.success("Payment successfully reversed");
      queryClient.invalidateQueries({ active: true });
      setExpandedRow(null);
    },
  });

  if (isLoading) return null;

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id); // Toggle expanded row
  };

  const pendingData = data?.filter((item) => item.status === "APPROVED");

  async function reversePayment(id) {
    const upload = data.filter((item) => item.id === id);
    const [dataNew] = upload;

    let { data: USD_BALANCE, error: usdError } = await supabase
      .from("USD_BALANCE")
      .select("*");
    if (usdError) console.error("Error fetching data:", usdError);

    const [{ balance }] = USD_BALANCE;

    const newBalance = Number(balance) - Number(dataNew.amount);
    const bal = String(newBalance);

    const { error: updateUsdError } = await supabase
      .from("USD_BALANCE")
      .update({ balance: bal })
      .eq("user_id", dataNew.user_id);

    if (updateUsdError) console.error("Error fetching data:", updateUsdError);

    const { error: updateInvoiceError } = await supabase
      .from("Transactions")
      .update({ status: "PENDING" })
      .eq("id", dataNew.id);

    if (updateInvoiceError)
      console.error("Error fetching data:", updateInvoiceError);
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
        Approved Transactions
      </h1>

      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-3 font-semibold text-lg border-b pb-2 border-gray-300">
        <h4 className="text-gray-700">User Name</h4>
        <h4 className="text-gray-700">Amount</h4>
        <h4 className="text-gray-700">Actions</h4>
      </div>

      {/* Transactions */}
      <main className="space-y-4">
        {pendingData?.map((request) => (
          <div key={request.id} className="space-y-2">
            {/* Main Row */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 items-start sm:items-center gap-y-2 py-2 px-4 bg-gray-50 rounded-lg shadow-sm ${
                expandedRow === request.id ? "border border-blue-300" : ""
              }`}
            >
              <div>
                <h4 className="text-gray-800 text-sm sm:text-base">
                  <strong className="sm:hidden">User:</strong>{" "}
                  {request.username}
                </h4>
              </div>
              <div>
                <h4 className="text-gray-800 text-sm sm:text-base">
                  <strong className="sm:hidden">Amount:</strong> $
                  {request.amount}
                </h4>
              </div>
              <div className="flex items-center justify-between sm:justify-start space-x-2">
                <button
                  onClick={() => handleExpandRow(request.id)}
                  className="w-full sm:w-28 text-white bg-blue-600 hover:bg-blue-700 font-medium py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
                >
                  {expandedRow === request.id ? "Hide Info" : "More Info"}
                </button>
              </div>
            </div>

            {/* Expanded Info */}
            {expandedRow === request.id && (
              <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-blue-300 space-y-2 text-sm sm:text-base">
                <p className="text-gray-700">
                  <strong>Location:</strong> {request.location || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {request.email || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>User ID:</strong> {request.user_id || "N/A"}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => reversePay(request.id)}
                    className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {isPending ? "Reversing..." : "Reverse Payment"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </section>
  );
}

export default ApprovedRequests;
