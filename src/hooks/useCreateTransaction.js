import { useMutation } from "@tanstack/react-query";
import { createTransactionFN } from "../services/Transactions/CreateTransaction";
import { useUser } from "./useUser";
import { v4 as uuidv4 } from "uuid";

function useCreateTransaction() {
  const { user } = useUser();
  const transaction_id = uuidv4().split("-")[0];
  const reference_id = uuidv4().split("-")[0];

  const { mutate: createTransaction, isPending } = useMutation({
    mutationKey: ["invoice"],
    mutationFn: (data) =>
      createTransactionFN({
        ...data,
        user_email: user.email,
        user_id: user.id,
        user_data: user.user_metadata,
        username: user.user_metadata.username,
        reference_id,
        transaction_id,
      }),
  });

  return { createTransaction, isPending };
}

export { useCreateTransaction };
