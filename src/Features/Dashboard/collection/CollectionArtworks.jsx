import { Plus } from "lucide-react";
import Card from "./Card";
import { motion } from "framer-motion";
import MintArtwork from "./MintArtwork";
import { useMint } from "./useMint";
import SpinnerFullPage from "../../../ui/SpinnerFullPage";
import Modal from "../../../ui/Modal";
import { useDarkMode } from "../../../hooks/DarkModeContext";
import { useLocation } from "react-router-dom";

function CollectionArtworks() {
  const { data, isLoading } = useMint();
  const location = useLocation();

  const { isDarkMode } = useDarkMode();
  if (isLoading) return <SpinnerFullPage />;

  return (
    <div className="md:p-4 sm:p-2 min-h-screen p-6">
      <h1
        className={`text-4xl font-bold mb-8 ${
          isDarkMode ? "text-blue-100" : "text-blue-900"
        } text-center`}
      >
        {location.state[0].collectionName} Collection
      </h1>
      <div className="mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {data.images &&
            data.images.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden bg-blue-900/20 border-blue-700/50"
              >
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "10px",
                  }}
                  className={`aspect-square relative group`}
                >
                  <div className="absolute inset-0 bg-blue-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <p className="text-blue-100 text-md">{image.title}</p>
                  </div>
                </motion.div>
              </Card>
            ))}

          <Modal>
            <Modal.Open opens={"Mint"}>
              <Card className="group cursor-pointer bg-blue-900/20 border-blue-700/50 backdrop-blur-sm hover:border-blue-500 transition-all duration-300">
                <div className="flex flex-col items-center justify-center h-full min-h-[250px] p-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      isDarkMode
                        ? "bg-blue-500/20 group-hover:bg-blue-500/30"
                        : "bg-blue-500/10 group-hover:bg-blue-500/20"
                    } transition-colors duration-300`}
                  >
                    <Plus
                      size={32}
                      className={`${
                        isDarkMode
                          ? "text-blue-300 group-hover:text-blue-100"
                          : "text-blue-500 group-hover:text-blue-700"
                      } transition-colors duration-300`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isDarkMode ? "text-blue-100" : "text-blue-900"
                    }`}
                  >
                    Mint Artwork
                  </h3>
                  <p
                    className={`text-sm text-center ${
                      isDarkMode ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    upload and mint a new NFT
                  </p>
                </div>
              </Card>
            </Modal.Open>

            <MintArtwork />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default CollectionArtworks;
