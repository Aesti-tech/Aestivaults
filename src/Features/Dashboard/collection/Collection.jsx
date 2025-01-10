import Modal from "../../../ui/Modal";
import SpinnerFullPage from "../../../ui/SpinnerFullPage";
import CreateCollection from "./CreateCollection";
import { useCollection } from "./useCollection";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ImageIcon, Plus } from "lucide-react";
import Card from "./Card";
import { useDarkMode } from "../../../hooks/DarkModeContext";

function Collection() {
  const { collections, isLoading, isMutating } = useCollection();
  const location = useLocation();
  const navigate = useNavigate();

  const { isDarkMode } = useDarkMode();

  if (isLoading || isMutating) return <SpinnerFullPage />;

  if (location.pathname !== "/dashboard/collection") return <Outlet />;

  function handleClick(id) {
    const collection = collections.filter((item) => item.id === id);

    navigate(`/dashboard/collection/${id}`, { state: collection });
  }

  return (
    <div className={`p-8 min-h-screen`}>
      <h1
        className={`text-4xl font-bold mb-8 text-center ${
          isDarkMode ? "text-blue-100" : "text-blue-900"
        }`}
      >
        My Collections
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections?.map((collection) => (
          <Card
            key={collection.id}
            onClick={() => handleClick(collection.id)}
            className={`group overflow-hidden ${
              isDarkMode
                ? "bg-blue-900/20 border-blue-700/50 backdrop-blur-sm hover:border-blue-500"
                : "bg-white border-gray-300 backdrop-blur-none hover:border-blue-500"
            } transition-all duration-300`}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={collection.featuredimage}
                alt={collection.name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 ${
                  isDarkMode
                    ? "bg-gradient-to-t from-blue-900/90 to-transparent"
                    : "bg-gradient-to-t from-gray-100/90 to-transparent"
                }`}
              >
                <div className="flex items-center gap-2 text-blue-200">
                  <ImageIcon size={16} />
                  <span className="text-sm">
                    {collection.imageCount} images
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-blue-100" : "text-blue-900"
                }`}
              >
                {collection.collectionName}
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                {collection.description}
              </p>
            </div>
          </Card>
        ))}
        <Modal>
          <Modal.Open opens={"collection"}>
            <Card
              className={`group cursor-pointer ${
                isDarkMode
                  ? "bg-blue-900/20 border-blue-700/50 backdrop-blur-sm hover:border-blue-500"
                  : "bg-white border-gray-300 backdrop-blur-none hover:border-blue-500"
              } transition-all duration-300`}
            >
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
                  Create Collection
                </h3>
                <p
                  className={`text-sm text-center ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  create a new nft collection
                </p>
              </div>
            </Card>
          </Modal.Open>
          <CreateCollection />
        </Modal>
      </div>
    </div>
  );
}

export default Collection;
