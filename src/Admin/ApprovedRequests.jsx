import { useState } from "react";
import { supabase } from "../services/API/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ApprovedRequests() {
  const [expandedRow, setExpandedRow] = useState(null);
  const queryClient = useQueryClient();

  const fetchData = async () => {
    let { data, error } = await supabase.from("invoices").select("*");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      return data;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["approvedBankTransfer"],
    queryFn: fetchData,
  });

  const { mutate: reversePay, isPending } = useMutation({
    mutationKey: ["reversed"],
    mutationFn: (id) => reversePayment(id),
    onSuccess: () => {
      toast.success("Payment successfully reversed");
      queryClient.invalidateQueries({ queryKey: "approvedBankTransfer" });
      setExpandedRow(null);
    },
  });

  if (isLoading) return null;

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id); // Toggle expanded row
  };

  const pendingData = data.filter((item) => item.status === "APPROVED");

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

    console.log(bal);

    const { error: updateUsdError } = await supabase
      .from("USD_BALANCE")
      .update({ balance: bal })
      .eq("user_id", dataNew.user_id);

    if (updateUsdError) console.error("Error fetching data:", updateUsdError);

    const { error: updateInvoiceError } = await supabase
      .from("invoices")
      .update({ status: "PENDING" })
      .eq("id", dataNew.id);

    if (updateInvoiceError)
      console.error("Error fetching data:", updateInvoiceError);
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Approved Transactions
      </h1>

      {/* Header Row */}
      <div className="grid grid-cols-3 font-semibold text-lg border-b pb-2 border-gray-300">
        <h4 className="text-gray-700">User Name</h4>
        <h4 className="text-gray-700">Amount</h4>
        <h4 className="text-gray-700">Actions</h4>
      </div>

      {/* Transactions */}
      <main className="space-y-4">
        {pendingData.map((request) => (
          <div key={request.id} className="space-y-2">
            {/* Main Row */}
            <div
              className={`grid grid-cols-3 items-center py-2 px-4 bg-gray-50 rounded-lg shadow-sm ${
                expandedRow === request.id ? "border border-blue-300" : ""
              }`}
            >
              <h4 className="text-gray-800">{request.userName}</h4>
              <h4 className="text-gray-800">${request.amount}</h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExpandRow(request.id)}
                  className="w-28 text-white bg-blue-600 hover:bg-blue-700 font-medium py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
                >
                  {expandedRow === request.id ? "Hide Info" : "More Info"}
                </button>
              </div>
            </div>

            {/* Expanded Info */}
            {expandedRow === request.id && (
              <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-blue-300">
                <p className="text-gray-700">
                  <strong>Location:</strong> {request.location || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {request.email || "N/A"}
                </p>

                <p className="text-gray-700">
                  <strong>user id:</strong> {request.user_id || "N/A"}
                </p>

                <div className="flex gap-x-4 ">
                  <button
                    onClick={() => reversePay(request.id)}
                    className="w-auto h-12 text-white bg-blue-600 hover:bg-blue-700 flex items-center font-medium py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm"
                  >
                    {isPending ? "Reversing...." : "Reverse Payment"}
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
