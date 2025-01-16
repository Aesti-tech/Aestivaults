import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handlePurchase } from "./purchase";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../ui/Modal";

function usePurchase() {
  const navigate = useNavigate();
  const { close } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => handlePurchase(data),
    mutationKey: ["purchase nft"],
    onSuccess: () => {
      toast.success(
        `successfuly purchased artwork it has been added to the selected collection`
      );
      close();
      navigate("/dashboard/collection");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return { mutate, isPending };
}

export { usePurchase };
