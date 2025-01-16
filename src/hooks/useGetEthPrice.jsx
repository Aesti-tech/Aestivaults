import { useQuery } from "@tanstack/react-query";
import { currentPrice } from "../utils/helpers";

function useGetEthPrice() {
  const { data, isLoading } = useQuery({
    queryKey: ["ethereum"],
    queryFn: currentPrice,
  });
  return { data, isLoading };
}

export default useGetEthPrice;
