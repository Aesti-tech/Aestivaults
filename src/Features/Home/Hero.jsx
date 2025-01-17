import { motion } from "framer-motion";
import { useDarkMode } from "../../hooks/DarkModeContext";
import { Link } from "react-router-dom";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg sm:text-2xl font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className} `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Hero = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen flex items-center relative overflow-hidden ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <div className="container flex flex-col-reverse md:flex-row mx-auto px-4 pt-10 items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center md:text-left"
        >
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text`}
          >
            Collect Digital Art & NFTs
          </h1>
          <p
            className={`text-xl mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover, collect, and sell extraordinary NFTs on the world&apos;s
            first and largest NFT marketplace.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link to={"/market"}>
              <Button variant="primary">Start Exploring</Button>
            </Link>
            <Link to={"/dashboard/collection"}>
              <Button variant="secondary">Create NFT</Button>
            </Link>
          </div>
        </motion.div>

        {/* Animated Hero Image */}
        <motion.img
          src="/heroImage.png"
          alt="Hero NFT Artwork"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-full md:max-w-lg lg:max-w-xl rounded-lg  object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
