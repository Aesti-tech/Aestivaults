import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import SpinnerFullPage from "../../ui/SpinnerFullPage";

const TransactionReceipt = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchData("Transactions", {
    column: "id",
    value: id,
  });

  if (isLoading) return <SpinnerFullPage />;

  const transaction = data[0];

  // Extract and format the date and time from created_at
  const createdAt = new Date(transaction.created_at);
  const date = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="max-w-md mx-auto my-10 bg-gray-100 p-6 rounded-lg shadow-md font-sans">
      {/* Header */}
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        Transaction Receipt
      </h2>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      {/* Receipt Details */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Transaction ID:</span>
          <span>{transaction.transaction_id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Time:</span>
          <span>{time}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Amount:</span>
          <span className="text-green-600 font-semibold">
            ${transaction.amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Status:</span>
          <span
            className={`font-semibold ${
              transaction.status === "APPROVED"
                ? "text-green-600"
                : transaction.status === "PENDING"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {transaction.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Payment Method:</span>
          <span>{transaction.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Recipient:</span>
          <span>{"Aestivaults Inc."}</span>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-4" />

      {/* Footer */}
      <div className="text-center text-xs text-gray-500">
        Thank you for your transaction! <br />
        For support, contact us at{" "}
        <a
          href="mailto:support@example.com"
          className="text-blue-500 hover:underline"
        >
          Aestivaults@gmail.com
        </a>
        .
      </div>
    </div>
  );
};

export default TransactionReceipt;
