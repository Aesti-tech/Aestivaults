import Form from "../../ui/Form";
import Formrow from "../../ui/Formrow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import { useNavigate } from "react-router-dom";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";

function WithdrawToWallet() {
  const { createTransaction, isPending } = useCreateTransaction();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const newAmount = data.amount.replace(/[^\d.]/g, "");

    const transferData = {
      amount: newAmount,
      type: "withdraw to wallet",

      details: [
        {
          ...data,
        },
      ],
    };

    createTransaction(transferData, {
      onSuccess: () => {
        reset();
        navigate("/dashboard/wallet/success", {
          state: { type: "Withdrawal" },
        });
      },
    });
  }

  if (isPending) return <SpinnerFullPage />;
  return (
    <Form handleSubmit={handleSubmit(onSubmit)}>
      <h2>Withdraw to Wallet</h2>
      <Formrow name={"Wallet Address"} id={"walletaddress"} errors={errors}>
        <Input
          placeholder={`Please input your Wallet address`}
          name={"walletaddress"}
          disabled={isPending || isSubmitting}
          register={register}
          validation={{
            required: "this field is required",
          }}
        />
      </Formrow>

      <Formrow name={`Amount`} id={"amount"} errors={errors}>
        <Input
          placeholder={`Please input the withdrawal amount`}
          name={"amount"}
          register={register}
          disabled={isPending || isSubmitting}
          validation={{
            required: "this field is required",
          }}
        />
      </Formrow>

      <Button
        disabled={isPending || isSubmitting}
        variations={"primary"}
        sizes={"medium"}
      >
        {isPending || isSubmitting ? "submitting...." : "Submit"}
      </Button>
    </Form>
  );
}

export default WithdrawToWallet;
