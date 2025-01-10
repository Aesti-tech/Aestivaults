import Form from "../../ui/Form";
import Formrow from "../../ui/Formrow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import { useNavigate } from "react-router-dom";

function WithdrawToBank() {
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
      type: "withdraw to Bank",
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
      <h2>Withdraw to bank Account</h2>
      <Formrow name={"Account Name"} errors={errors} id={"accountName"}>
        <Input
          disabled={isPending || isSubmitting}
          placeholder={"Please input your account name"}
          name={"accountName"}
          register={register}
          validation={{
            required: "Account Name is required",
          }}
        />
      </Formrow>
      <Formrow name={"Account Number"} id={"accountNo"} errors={errors}>
        <Input
          disabled={isPending || isSubmitting}
          placeholder={"Please input your account number"}
          register={register}
          name={"accountNo"}
          validation={{
            required: "Account no is required",
            pattern: {
              value: /^\d+$/,
              message: "please input a valid account No",
            },
          }}
        />
      </Formrow>
      <Formrow name={"Bank Name"} id={"bank"} errors={errors}>
        <Input
          disabled={isPending || isSubmitting}
          placeholder={"Please input your Bank name"}
          name={"bank"}
          register={register}
          validation={{
            required: "Bank Name is required",
          }}
        />
      </Formrow>

      <Formrow name={"Amount"} id={"amount"} errors={errors}>
        <Input
          disabled={isPending || isSubmitting}
          placeholder={"Please input withdrawal amount"}
          name={"amount"}
          register={register}
          validation={{
            required: "withdrawal amount is required",
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

export default WithdrawToBank;
