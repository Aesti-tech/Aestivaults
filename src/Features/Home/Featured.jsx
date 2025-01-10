import { useDarkMode } from "../../hooks/DarkModeContext";
import ArtworkCard from "./ArtworkCard";

const FeaturedArtworks = () => {
  const { isDarkMode } = useDarkMode();

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
        {featuredArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} {...artwork} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedArtworks;

const featuredArtworks = [
  {
    id: 1,
    title: "Cosmic Dreamscape",
    artist: "Elena Frost",
    price: "2.5 ETH",
    image:
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&auto=format&fit=crop&q=60",
  },

  {
    artist: "Elena Frost",
    title: "Cosmic Dreamscape",
    price: "2.5 ETH",
    display_name: "fb4e58cb-1a10-4817-a368-cd511d174805_bnn6fi",
    image:
      "http://res.cloudinary.com/diiqej9hw/image/upload/v1735714433/fb4e58cb-1a10-4817-a368-cd511d174805_bnn6fi.jpg",
  },
  {
    artist: "Elena Frost",
    title: "Cosmic Dreamscape",
    price: "2.5 ETH",
    display_name: "fa888853-fb65-4a1b-936f-f71758d6626c_qqej7i",
    image:
      "http://res.cloudinary.com/diiqej9hw/image/upload/v1735714433/fa888853-fb65-4a1b-936f-f71758d6626c_qqej7i.jpg",
  },
  {
    artist: "Elena Frost",
    title: "Cosmic Dreamscape",
    price: "2.5 ETH",
    display_name: "f4356857-7e47-4cd1-8efb-798b6ed154f4_q5pwu7",
    image:
      "http://res.cloudinary.com/diiqej9hw/image/upload/v1735714433/f4356857-7e47-4cd1-8efb-798b6ed154f4_q5pwu7.jpg",
  },
  {
    artist: "Elena Frost",
    title: "Cosmic Dreamscape",
    price: "2.5 ETH",
    display_name: "fa258800-297c-4a70-bfca-517cf6fd35fa_orlcsg",
    image:
      "http://res.cloudinary.com/diiqej9hw/image/upload/v1735714433/fa258800-297c-4a70-bfca-517cf6fd35fa_orlcsg.jpg",
  },
  {
    artist: "Elena Frost",
    title: "Cosmic Dreamscape",
    price: "2.5 ETH",
    display_name: "f3055628-fe7a-4b2a-9125-70552f35ceff_brssem",
    image:
      "http://res.cloudinary.com/diiqej9hw/image/upload/v1735714432/f3055628-fe7a-4b2a-9125-70552f35ceff_brssem.jpg",
  },
];
