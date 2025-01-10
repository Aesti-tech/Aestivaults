import { FaChartBar, FaDollarSign } from "react-icons/fa";
import { FaMessage, FaUserCheck } from "react-icons/fa6";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { supabase } from "../services/API/supabase";
import toast from "react-hot-toast";

function Dashboard() {
  const head =
    "text-sm font-medium bg-gradient-to-r from-slate-900 to-gray-400 text-transparent bg-clip-text";

  return (
    <div className={styles.Dashboard}>
      <h2 className="text-3xl font-bold mb-3 mt-4 bg-gradient-to-r from-blue-400 to-pink-700 text-transparent bg-clip-text">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 py-8">
        <div className="border-2 shadow-md rounded-lg p-4 py-8">
          <header className="flex flex-row items-center rounded-md justify-between space-y-0 pb-2">
            <h2 className={head}>Pending Requests</h2>
            <FaDollarSign className="h-5 w-5 text-muted-foreground text-green-300" />
          </header>
          <div>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+2 from last hour</p>
          </div>
        </div>
        <div className="border-2 shadow-md rounded-lg p-4 py-8">
          <head className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className={head}>Total Users</h2>
            <FaUserCheck className="h-5 w-5 text-muted-foreground text-white" />
          </head>
          <div>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+7 new users today</p>
          </div>
        </div>
        <div className="border-2 shadow-md rounded-lg p-4 py-8">
          <head className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className={head}>Unread Messages</h2>
            <FaMessage className="h-5 w-5 text-muted-foreground text-blue-300" />
          </head>
          <div>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              5 new since last login
            </p>
          </div>
        </div>
        <div className="border-2 shadow-md rounded-lg p-4 py-8">
          <head className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className={head}>Total Transactions</h2>
            <FaChartBar className="h-5 w-5 text-muted-foreground text-indigo-300" />
          </head>
          <div>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </div>
        </div>
      </div>

      <Wallet />
    </div>
  );
}

export default Dashboard;

function Wallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [uploadedQrCode, setUploadedQrCode] = useState(null);

  const handleWalletAddressChange = (e) => {
    const newWalletAddress = e.target.value;
    setWalletAddress(newWalletAddress);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedQrCode(reader.result); // Store the uploaded image URL
      };
      reader.readAsDataURL(file); // Convert the image to a base64 URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address: walletAddress,
      image: uploadedQrCode,
    };

    const { error } = await supabase.from("wallet").update(payload).eq("id", 1);

    if (error) {
      toast.error("Failed to update wallet");
      throw new Error(error);
    }

    setWalletAddress("");
    setUploadedQrCode(null);

    toast.success("Wallet successfully updated");
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Update Wallet Address
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Wallet Address Input */}
        <div className="space-y-2">
          <label
            htmlFor="wallet-address"
            className="block text-sm font-medium text-gray-700"
          >
            Wallet Address
          </label>
          <input
            id="wallet-address"
            type="text"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            placeholder="Enter your wallet address"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* QR Code Image Upload */}
        <div className="space-y-2">
          <label
            htmlFor="qr-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Upload QR Code (Optional)
          </label>
          <input
            id="qr-upload"
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
