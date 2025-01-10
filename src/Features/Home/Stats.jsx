import { motion } from "framer-motion";
import { useDarkMode } from "../../hooks/DarkModeContext";

const Stats = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, isDarkMode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-xl p-6 text-center shadow-md ${
        isDarkMode
          ? "bg-white/10 backdrop-blur-lg text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h3
        className={`text-3xl font-bold mb-2 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {value}
      </h3>
      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        {label}
      </p>
    </motion.div>
  );
};

const stats = [
  { label: "Active Artists", value: "2.7K+" },
  { label: "NFTs Created", value: "18K+" },
  { label: "Trading Volume", value: "$95M+" },
  { label: "Total Users", value: "12K+" },
];

export default Stats;
