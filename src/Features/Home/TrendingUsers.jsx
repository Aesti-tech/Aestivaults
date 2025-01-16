import { useRef } from "react";
import { motion } from "framer-motion";
import UserCard from "./UserCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDarkMode } from "../../hooks/DarkModeContext";
import useFetchData from "../../hooks/useFetchData";

const TrendingUsers = () => {
  const containerRef = useRef(null);
  const { data, isLoading } = useFetchData("usernames");

  const scroll = (direction = "left") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const { isDarkMode } = useDarkMode();

  if (isLoading) return null;

  const user = data.slice(0, 10);

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
        {user.map((user) => (
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
