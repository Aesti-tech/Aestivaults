import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../hooks/useUser";
import { useDarkMode } from "../../../hooks/DarkModeContext";
import { supabase } from "../../../services/API/supabase";
import { useState } from "react";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

function Listing() {
  const { user } = useUser();
  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchData("collections", {
    column: "userid",
    value: user?.id,
  });

  const tokenId = uuidv4();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateGallery"],
    mutationFn: handleSubmit,
    onSuccess: () => {
      toast.success("Artwork successfully listed");
      navigate("/dashboard/collection");
    },
  });

  const { id } = useParams();
  const artwork = data?.find((item) => item.id === location.state);
  const image = artwork?.images.filter((item) => item.id === Number(id));

  async function handleSubmit() {
    const salt = CryptoJS.lib.WordArray.random(16).toString(); // 16 bytes of randomness
    const NFT_token = CryptoJS.SHA256(`${salt}:${tokenId}`).toString();
    const owner_id = CryptoJS.SHA256(`${user.id}`).toString();

    if (!price) {
      toast.error("Please fill in a price in Ethereum");
      throw new Error("please fill in a price");
    }

    const { data: likeData, error: galleryError } = await supabase
      .from("gallery")
      .select("*")
      .eq("image", image[0].url)
      .eq("listing_id", image[0].id);

    if (galleryError) throw new Error(galleryError);

    if (!user?.user_metadata?.owner_nft_id) {
      const { error } = await supabase.auth.updateUser({
        data: {
          owner_nft_id: owner_id,
        },
      });

      if (error) throw new Error(error);
    }

    if (likeData.length === 0) {
      const { data, error } = await supabase
        .from("gallery")
        .insert([
          {
            likes: "0",
            image: image[0].url,
            name: image[0].name,
            artist: user.user_metadata.name,
            description: image[0].alt,
            collection: artwork.collectionName,
            price: price,
            bids: [],
            listing_id: image[0].id,
            owner_user_id: user.id,
            royalty: image[0].royalty,
            NFT_token,
            owner_id,
            artistInfo: [
              {
                name: user.user_metadata.name,
                username: user.user_metadata.username,
                user_id: user.id,
                avatar: user.user_metadata.avatar,
                date: Date.now(),
                salt,
              },
            ],
          },
        ])
        .select();

      if (error) throw new Error(error);

      return data;
    } else {
      toast.error("Image has already been listed");
      navigate(-1);
      throw new Error("image already listed");
    }
  }
  if (isLoading || isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Failed to fetch collection data. Please try again later.</p>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        <p>No artwork found for the provided ID.</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div
        className={`max-w-4xl mx-auto ${
          !isDarkMode ? "bg-white" : "bg-blue-200"
        } rounded-lg shadow-md p-6`}
      >
        {/* Collection Information */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={artwork.featuredimage}
            alt={artwork.collectionName}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {artwork.collectionName}
            </h1>
            <p className="text-gray-600">{artwork.description}</p>
          </div>
        </div>

        {/* Artwork Listing */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            List Artwork
          </h2>
          <div className="space-y-6">
            {image.map((image) => (
              <div
                key={image.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 border rounded-lg"
              >
                {/* Image and Details */}
                <div className="flex items-center gap-4">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {image.name}
                    </h3>
                    <p className="text-sm text-gray-500">{image.alt}</p>
                    <p className="text-sm text-gray-500">
                      Royalty: {image.royalty}
                    </p>
                  </div>
                </div>

                {/* Input for Price */}
                <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <label
                    htmlFor={`price-${image.id}`}
                    className="text-sm font-medium text-gray-600"
                  >
                    Price:
                  </label>
                  <input
                    id={`price-${image.id}`}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price in Ethereum"
                    className="border-gray-300 p-2 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={mutate}
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Listings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Listing;
