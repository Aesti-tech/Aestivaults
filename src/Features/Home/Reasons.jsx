import { motion } from "framer-motion";
import { useDarkMode } from "../../hooks/DarkModeContext";

const ReasonsToJoin = () => {
  const { isDarkMode } = useDarkMode();

  const categories = [
    {
      title: "As a Creator",
      text: "Bring your art to life. Create NFTs, sell your work, and earn royalties for the future.",
      image: "/reasons/creator.png", // Replace with actual image paths
    },
    {
      title: "As an Artist",
      text: "Showcase your talent, sell exclusive works, and secure investments for your journey.",
      image: "/reasons/artist.png",
    },
    {
      title: "As a Buyer",
      text: "Discover valuable, fine artworks and invest in the next big masterpiece.",
      image: "/reasons/buyer.png",
    },
  ];

  return (
    <div className={`py-16 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Why Join Aestivaults?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-sm md:text-base">{category.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReasonsToJoin;
