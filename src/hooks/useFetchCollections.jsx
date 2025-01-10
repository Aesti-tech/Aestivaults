import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_KEY = "d9c5782a-1fca-4b05-a930-5b597a2f3187";
const BASE_URL = "https://data-api.nftgo.io/eth/v1/";

function useFetchCollections() {
  async function fetchTrendingCollections() {
    try {
      const response = await axios.get(
        `${BASE_URL}market/rank/collection/1h?by=volume&with_rarity=false&asc=false&offset=0&limit=10`,
        {
          headers: {
            "X-API-Key": API_KEY,
            accept: "application/json",
          },
        }
      );

      // The response contains an array of trending collections
      const collections = response.data;
      console.log("Trending Collections:", collections);

      return collections;
    } catch (error) {
      console.error("Error fetching trending collections:", error);
    }
  }

  const { isLoading, data } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchTrendingCollections,
  });

  return { isLoading, data };
}

export default useFetchCollections;
