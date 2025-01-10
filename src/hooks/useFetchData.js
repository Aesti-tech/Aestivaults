import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/API/supabase";

function useFetchData(Table, filter = null) {
  async function getData() {
    let query = supabase.from(Table).select("*");

    // Apply the conditional .eq filter if provided
    if (filter?.column && filter?.value) {
      query = query.eq(filter.column, filter.value);
    }

    const { data, error } = await query;

    if (error) {
      console.error("There was an error fetching data:", error.message);
      return;
    }

    return data;
  }

  const { data, isLoading } = useQuery({
    queryKey: [Table, filter], // Include filter in the query key to invalidate on change
    queryFn: getData,
  });

  return { data, isLoading };
}

export default useFetchData;
