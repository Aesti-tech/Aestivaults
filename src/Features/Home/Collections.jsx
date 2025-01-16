import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

function Collections() {
  const { data, isLoading } = useFetchData("collections");

  if (isLoading) return null;
  const collection = [...data].reverse().splice(0, 6);

  return (
    <div className="container mx-auto py-[100px]">
      <h1 className="text-4xl font-bold mb-8">Featured Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collection.map((collection) => (
          <CollectionCard key={collection.id} {...collection} />
        ))}
      </div>
    </div>
  );
}

export default Collections;

export const CollectionCard = ({ collectionName, featuredimage, userid }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { data, isLoading } = useFetchData("usernames", {
    column: "user_id",
    value: userid,
  });

  if (isLoading) return null;
  const [userInfo] = data;

  const {
    user_data: [{ name, avatar, username }],
  } = userInfo;

  return (
    <motion.div
      className="relative w-full h-[320px] rounded-xl overflow-hidden cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${featuredimage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Collection Info */}
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h2 className="text-lg font-bold text-white mb-1">{collectionName}</h2>
      </div>

      {/* Owner Preview */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 right-4"
          >
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full border-2 border-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Owner Info */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center"
          >
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full border-2 border-white mb-3"
            />
            <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
            <Link to={`/userprofile/${username}`}>
              <button className="px-4 w-auto py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors">
                View Profile
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
