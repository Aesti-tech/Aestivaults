import { useRef } from "react";
import { motion } from "framer-motion";
import UserCard from "./UserCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDarkMode } from "../../hooks/DarkModeContext";

const TrendingUsers = () => {
  const containerRef = useRef(null);

  const scroll = (direction = "left") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`container mx-auto px-4 py-16 `}>
      <div className="flex justify-between items-center mb-8">
        <h2
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Trending Creators
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide flex gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {trendingUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UserCard {...user} isDarkMode={isDarkMode} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingUsers;

const trendingUsers = [
  {
    id: 1,
    name: "Sarah",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    totalSales: "120.5 ETH",
    verified: true,
  },
  {
    id: 2,
    name: "CryptoKing",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    totalSales: "98.2 ETH",
    verified: true,
  },
  {
    id: 3,
    name: "NFT Master",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    totalSales: "87.1 ETH",
    verified: true,
  },
  {
    id: 4,
    name: "Pixel Artist",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    totalSales: "65.8 ETH",
    verified: false,
  },
  {
    id: 5,
    name: "Digital",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    totalSales: "45.2 ETH",
    verified: true,
  },
  {
    id: 1,
    name: "Sarah",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    totalSales: "120.5 ETH",
    verified: true,
  },
  {
    id: 2,
    name: "CryptoKing",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    totalSales: "98.2 ETH",
    verified: true,
  },
  {
    id: 3,
    name: "NFT Master",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    totalSales: "87.1 ETH",
    verified: true,
  },
  {
    id: 4,
    name: "Pixel Artist",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    totalSales: "65.8 ETH",
    verified: false,
  },
  {
    id: 5,
    name: "Digital",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    totalSales: "45.2 ETH",
    verified: true,
  },
];
