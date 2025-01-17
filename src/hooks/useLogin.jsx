import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/Authentication/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: LoginUSer, isPending: isLogginIn } = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);

      if (!user.user.user_metadata.username) {
        navigate("/createusername");
        return;
      }
      navigate("/dashboard");
    },

    onError: (err) => {
      console.error("ERROR", err.message);
      toast.error("Provided Email or password is incorrect");
    },
  });

  return { LoginUSer, isLogginIn };
}

export { useLogin };
