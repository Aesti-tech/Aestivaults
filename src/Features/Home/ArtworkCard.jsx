import { motion } from "framer-motion";

function ArtworkCard({ title, artist, image, price, isDarkMode }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-xl overflow-hidden ${
        isDarkMode
          ? "bg-white/5 backdrop-blur-lg shadow-lg text-white"
          : "bg-gray-100 shadow-md text-gray-900"
      }`}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3
          className={`text-xl font-semibold mb-1 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-gray-400 mb-3 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          by {artist}
        </p>
        <div className="flex justify-between items-center">
          <span
            className={`font-semibold ${
              isDarkMode ? "text-purple-400" : "text-purple-600"
            }`}
          >
            {price}
          </span>
          <button
            className={`text-sm w-20 px-3 py-1 rounded-lg ${
              isDarkMode
                ? "text-white bg-white/10 hover:bg-white/20"
                : "text-gray-900 bg-gray-200 hover:bg-gray-300"
            }`}
          >
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ArtworkCard;
