import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../services/API/supabase";
import { useUser } from "../../../hooks/useUser";
import { createCollection } from "../../../services/Authentication/auth";
import toast from "react-hot-toast";

function useCollection() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  async function getCollections(id) {
    let { data: collections, error } = await supabase
      .from("collections")
      .select("*")
      .eq("userid", id);

    if (error) return error.message;

    return collections;
  }

  const { data: collections, isLoading } = useQuery({
    queryFn: () => getCollections(user.id),
    queryKey: ["collection"],
  });

  const { mutate: initializeCollection, isPending } = useMutation({
    mutationFn: (data) => createCollection(data),
    mutationKey: ["create collection"],
    onSuccess: () => {
      toast.success("collection created successfully");
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });

  return { collections, isLoading, initializeCollection, isPending };
}

export { useCollection };
