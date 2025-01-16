import { useDarkMode } from "../../hooks/DarkModeContext";
import useFetchData from "../../hooks/useFetchData";
import ArtworkCard from "./ArtworkCard";

const FeaturedArtworks = () => {
  const { isDarkMode } = useDarkMode();

  const { data, isLoading } = useFetchData("gallery");

  if (isLoading) return null;

  const getRandomArtworks = (data) => {
    // Shuffle the array using Fisher-Yates algorithm
    const shuffledData = [...data];
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }

    // Return the first 9 elements (or less if the array is smaller than 9)
    return shuffledData.slice(0, 9);
  };

  // Example usage
  const art = getRandomArtworks(data);

  return (
    <div className={`container mx-auto px-4 py-2 `}>
      <h2
        className={`text-3xl font-bold mb-8 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Featured Artworks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {art.map((artwork) => (
          <ArtworkCard key={artwork.id} {...artwork} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedArtworks;
