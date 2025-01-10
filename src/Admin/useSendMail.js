import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useSendMail(EmailPdf) {
  const { mutate: SendMail, isPending } = useMutation({
    mutationKey: ["email"],
    mutationFn: EmailPdf,
    onSuccess: () => {
      toast.success("Email sent successfully");
    },
  });

  return { SendMail, isPending };
}

export default useSendMail;
