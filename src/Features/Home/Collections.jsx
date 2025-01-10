import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Collections() {
  return (
    <div className="container mx-auto py-[100px]">
      <h1 className="text-4xl font-bold text-white mb-8">
        Featured Collections
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} {...collection} />
        ))}
      </div>
    </div>
  );
}

export default Collections;

export const CollectionCard = ({ name, worth, backgroundImage, owner }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[320px] rounded-xl overflow-hidden cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Collection Info */}
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h2 className="text-lg font-bold text-white mb-1">{name}</h2>
        <p className="text-purple-400 font-semibold text-sm">{worth}</p>
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
              src={owner.avatar}
              alt={owner.name}
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
              src={owner.avatar}
              alt={owner.name}
              className="w-20 h-20 rounded-full border-2 border-white mb-3"
            />
            <h3 className="text-lg font-semibold text-white mb-2">
              {owner.name}
            </h3>
            <button className="px-4 w-auto py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors">
              View Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const collections = [
  {
    id: 1,
    name: "Ethereal Dreams",
    worth: "245.5 ETH",
    backgroundImage:
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&auto=format&fit=crop&q=60",
    owner: {
      name: "Sarah Digital",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
  },
  {
    id: 2,
    name: "Neon Horizons",
    worth: "189.2 ETH",
    backgroundImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    owner: {
      name: "Alex Rivers",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  },
  {
    id: 3,
    name: "Digital Genesis",
    worth: "324.8 ETH",
    backgroundImage:
      "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?w=800&auto=format&fit=crop&q=60",
    owner: {
      name: "Maya Chen",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
  },
];
