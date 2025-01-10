import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import useFetchData from "../hooks/useFetchData";
import SpinnerFullPage from "../ui/SpinnerFullPage";
import useApprove from "./useApprove";
import ApprovedRequests from "./ApprovedRequests";

function PendingRequestsTable() {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const { data, isLoading } = useFetchData("Transactions");
  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  const { approvePay, isPending } = useApprove();

  const handleProceedToInvoice = (id) => {
    const transaction = data.filter((item) => item.id === id);
    navigate("/Admin/pending/invoice", { state: transaction });
  };

  const calculateTimePassed = (createdAt) => {
    const now = dayjs();
    const createdTime = dayjs(createdAt);
    const minutesPassed = now.diff(createdTime, "minute");

    if (minutesPassed > 60) {
      return Math.floor(minutesPassed / 60) + " hours ago";
    }
    return `${minutesPassed} minute${minutesPassed === 1 ? "" : "s"} ago`;
  };

  function handleSubmit(id) {
    approvePay(id);
  }

  if (isLoading) return <SpinnerFullPage />;

  const pendingData = data?.filter((item) => item.status === "PENDING");

  return (
    <>
      <section className="p-6 bg-white rounded-lg shadow-lg mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Pending Transactions
        </h1>
        {/* Header Row */}
        <div className="grid grid-cols-3 font-semibold text-lg border-b pb-2 border-gray-300">
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
                className={`grid grid-cols-3 items-center py-2 px-4 bg-gray-50 rounded-lg shadow-sm ${
                  expandedRow === request.id ? "border border-blue-300" : ""
                }`}
              >
                <h4 className="text-gray-800">{request.username}</h4>
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
                    {" "}
                    <strong>Type of Transaction:</strong> {request.type}
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {request.user_email || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>user id:</strong> {request.user_id || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Created:</strong>{" "}
                    {calculateTimePassed(request.created_at)}
                  </p>

                  {request.type === "Bank Transfer" && (
                    <div>
                      <p className="text-gray-700">
                        <strong>Location:</strong>{" "}
                        {request.details[0].location || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <strong>client acct Name:</strong>{" "}
                        {request.details[0].account_name || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <strong>client acct number:</strong>{" "}
                        {request.details[0].account_number || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <strong>client Bank:</strong>{" "}
                        {request.details[0].customer_bank || "N/A"}
                      </p>
                    </div>
                  )}

                  {request.type === "cryptowallet" && (
                    <div>
                      <p className="text-gray-700">
                        <strong>client wallet:</strong>{" "}
                        {request.details[0].wallet || "custom wallet"}
                      </p>
                      <p className="text-gray-700">
                        <strong>Ethereum sent:</strong>{" "}
                        {request.details[0].amountinEth || "N/A"}
                      </p>
                    </div>
                  )}

                  {request.type === "cashapp" && (
                    <div>
                      <p className="text-gray-700">
                        <strong>client name:</strong>{" "}
                        {request.details[0].name || "custom wallet"}
                      </p>
                      <p className="text-gray-700">
                        <strong>Cashapp handle:</strong>{" "}
                        {request.details[0].handle || "N/A"}
                      </p>
                    </div>
                  )}

                  {request.type === "zelle" && (
                    <div>
                      <p className="text-gray-700">
                        <strong>client name:</strong>{" "}
                        {request.details[0].name || "custom wallet"}
                      </p>
                      <p className="text-gray-700">
                        <strong>zelle handle:</strong>{" "}
                        {request.details[0].handle || "N/A"}
                      </p>
                    </div>
                  )}

                  {request.type === "paypal" && (
                    <div>
                      <p className="text-gray-700">
                        <strong>client name:</strong>{" "}
                        {request.details[0].name || "custom wallet"}
                      </p>
                      <p className="text-gray-700">
                        <strong>paypal handle:</strong>{" "}
                        {request.details[0].handle || "N/A"}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-x-4 ">
                    <button
                      onClick={() => handleProceedToInvoice(request.id)}
                      className="w-auto text-white bg-green-600 hover:bg-green-700 flex items-center font-medium py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm"
                    >
                      Proceed to Invoice
                    </button>
                    <button
                      onClick={() => handleSubmit(request.id)}
                      className="w-auto h-12 text-white bg-blue-600 hover:bg-blue-700 flex items-center font-medium py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm"
                    >
                      {isPending ? "Approving...." : "Approve"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </main>
      </section>
      <ApprovedRequests />
    </>
  );
}

export default PendingRequestsTable;
