import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const API_KEY = "d9c5782a-1fca-4b05-a930-5b597a2f3187";

function useMarketData() {
  const [searchParams] = useSearchParams();
  const day = searchParams.get("ranking") || "24h";
  const day2 = searchParams.get("trending") || "24h";

  async function fetchRankedCollections() {
    try {
      const response = await axios.get(
        `https://data-api.nftgo.io/eth/v1/market/rank/collection/${day}?by=volume&with_rarity=false&asc=false&offset=0&limit=50`,
        {
          headers: {
            "X-API-KEY": API_KEY,
            accept: "application/json",
          },
        }
      );

      const collections = response.data;

      return collections;
    } catch (error) {
      console.error("Error fetching trending collections:", error);
    }
  }

  async function fetchTrendingCollections() {
    try {
      const response = await axios.get(
        `https://data-api.nftgo.io/eth/v1/market/rank/nft/${day2}?by=price&category=ALL&offset=0&limit=50`,
        {
          headers: {
            "X-API-KEY": API_KEY,
            accept: "application/json",
          },
        }
      );

      const collections = response.data;

      return collections;
    } catch (error) {
      console.error("Error fetching trending collections:", error);
    }
  }

  const { isLoadingtrends, data: trending } = useQuery({
    queryKey: ["trending", day2],
    queryFn: fetchTrendingCollections,
  });

  const { isLoadingrank, data: ranked } = useQuery({
    queryKey: ["ranked", day],
    queryFn: fetchRankedCollections,
  });

  return { isLoadingrank, isLoadingtrends, trending, ranked };
}

export default useMarketData;
