import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../services/Authentication/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading: isCreatingUSer } = useMutation({
    mutationFn: (data) => signupUser(data),
    onSuccess: () => {
      toast.success(
        "Account created successfully! please verify your email account"
      );

      navigate("/");
    },

    onError: () => {
      toast.error(
        "There was an error while creating your account please try again"
      );
    },
  });

  return { signUp, isCreatingUSer };
}

export { useSignup };
