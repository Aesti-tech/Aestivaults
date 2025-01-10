import { useEffect, useState } from "react";
import { supabase } from "../services/API/supabase";
import { useUser } from "./useUser";

function useGetMessage() {
  const { user, isLoading } = useUser();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function getMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("There was an error fetching balance:", error.message);
        return;
      }

      if (data?.length > 0) {
        setMessages(data);
      }
    }

    if (!isLoading && user?.id) {
      getMessages();
    }
  }, [user, isLoading]);
  return { messages };
}

export default useGetMessage;
