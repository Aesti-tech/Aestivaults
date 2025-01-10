import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

function UserCard({ name, avatar, totalSales, verified, isDarkMode }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-xl p-4 w-64 ${
        isDarkMode
          ? "bg-white/10 backdrop-blur-lg shadow-lg text-white"
          : "bg-gray-100 shadow-md text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-4">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-1">
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {name}
            </h3>
            {verified && (
              <FaUserCircle
                className={`${isDarkMode ? "text-white" : "text-gray-500"}`}
              />
            )}
          </div>
          <p
            className={`${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
          >
            {totalSales}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default UserCard;
