import { useDarkMode } from "../hooks/DarkModeContext";
import { CheckCircle, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import SpinnerFullPage from "./SpinnerFullPage";
import { FaEthereum } from "react-icons/fa";
import useGetEthPrice from "../hooks/useGetEthPrice";
import { formatCurrency } from "../utils/helpers";
import styles from "../modules/UserProfile.module.css";

function UserProfile() {
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const { data, isLoading } = useFetchData("usernames", {
    column: "username",
    value: id,
  });

  if (isLoading) return <SpinnerFullPage />;

  const [user] = data;

  return (
    <div
      className={`min-h-screen p-8 ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <ProfileHeader
          profile={userProfile}
          user={user}
          isDarkMode={isDarkMode}
        />
        <NFTGrid user={user} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default UserProfile;

const ProfileHeader = ({ profile, user, isDarkMode }) => {
  const displayString = `${user.owner_id.slice(0, 6)}...${user.owner_id.slice(
    -6
  )}`;

  const {
    user_data: [data],
  } = user;

  return (
    <div
      className={`rounded-2xl p-6 mb-8 ${
        isDarkMode ? "bg-white/10" : "bg-gray-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={data.avatar}
          alt={data.username}
          className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 border-4 border-white-500  ${
            styles[data.verified]
          }`}
        />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-2">
            <h1
              className={`text-2xl sm:text-3xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {user.username}
            </h1>
            {data.verified && (
              <CheckCircle className="w-6 h-6 text-purple-500 sm:mt-0 mt-1" />
            )}
          </div>
          <div
            className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mb-4 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span
              title={user.owner_id} // Full string on hover
              style={{
                cursor: "pointer",
                fontFamily: "monospace", // Optional for better distinction
              }}
              className="truncate"
            >
              {displayString}
            </span>
            <button
              className={`hover:text-purple-400 w-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {profile.badges.map((badge, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  isDarkMode
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-purple-100 text-purple-500"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NFTGrid = ({ user, isDarkMode }) => {
  const { data: gallery, isLoadingGallery } = useFetchData("gallery", {
    column: "owner_user_id",
    value: user.user_id,
  });

  if (isLoadingGallery) return <SpinnerFullPage />;

  return (
    <>
      <StatsGrid gallery={gallery} isDarkMode={isDarkMode} user={user} />
      <div>
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Collected NFTs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery?.map((nft) => (
            <motion.div
              key={nft.id}
              whileHover={{ y: -5 }}
              className={`rounded-xl overflow-hidden ${
                isDarkMode ? "bg-white/10" : "bg-gray-200"
              }`}
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {nft.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400 flex items-center">
                    {nft.price} Eth <FaEthereum />
                  </span>
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {nft.purchaseDate}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

const StatsGrid = ({ isDarkMode, gallery, user }) => {
  const { data, isLoading } = useGetEthPrice();

  const { data: Transactions, isLoading: isLoadingTransactions } = useFetchData(
    "Transactions",
    {
      column: "user_id",
      value: user.user_id,
    }
  );

  if (isLoading || isLoadingTransactions) return null;

  const totalPrice = gallery?.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const trades = Transactions?.filter(
    (item) =>
      (item.status === "APPROVED" && item.type === "NFT sale") ||
      item.type === "NFT purchase"
  );

  const totalTradingVolume = trades?.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <StatCard
        label="Net Worth (USD)"
        value={`${formatCurrency(data * totalPrice)}`}
        isDarkMode={isDarkMode}
      />
      <StatCard
        label="Net Worth (ETH)"
        value={`${totalPrice} ETH`}
        isDarkMode={isDarkMode}
      />
      <StatCard
        label="Trading Volume (USD)"
        value={`${formatCurrency(totalTradingVolume)}`}
        isDarkMode={isDarkMode}
      />
      <StatCard
        label="Total Trades"
        value={trades.length.toString()}
        isDarkMode={isDarkMode}
      />
      <StatCard
        label="Rating"
        value={`${user.rating}/5`}
        subtitle={`${Math.floor(Math.random() * 100)} ratings`}
        isDarkMode={isDarkMode}
      />
      <StatCard
        label="Member Since"
        value={`${formatTimestamp(user.created_at)}`}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

const StatCard = ({ label, value, subtitle, isDarkMode }) => (
  <div
    className={`rounded-xl p-6 ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`}
  >
    <h3
      className={`text-sm mb-2 ${
        isDarkMode ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {label}
    </h3>
    <p
      className={`text-2xl font-bold ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {value}
    </p>
    {subtitle && (
      <p
        className={`text-sm mt-1 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

const userProfile = {
  badges: [
    "Early Adopter",
    "Top Trader",
    "Verified Collector",
    "Premium Member",
  ],
};

function formatTimestamp(isoString) {
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();

  // Determine the day suffix
  const suffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Handle 11th to 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${suffix(day)} ${month}, ${year}`;
}
