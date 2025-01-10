import { useQuery } from "@tanstack/react-query";

function useEthereumChart(days) {
  const {
    data,
    isLoading: loadingData,
    isError,
    error,
  } = useQuery({
    queryKey: ["ethereum data", days],
    queryFn: () => fetchEthereumData(days),
  });

  const { data: currentEthPrice, isLoading: loadingPrice } = useQuery({
    queryKey: ["ethereum price"],
    queryFn: currentPrice,
  });

  const isLoading = loadingPrice && loadingData;

  return { data, currentEthPrice, isLoading, isError, error };
}

export default useEthereumChart;

async function fetchEthereumData(days) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${days}`
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  return data.prices;
}

async function currentPrice() {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  return data?.USD;
}
