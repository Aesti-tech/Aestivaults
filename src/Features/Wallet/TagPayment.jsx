import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import Form from "../../ui/Form";
import Formrow from "../../ui/Formrow";
import Input from "../../ui/Input";
import { useFinance } from "../../context/FinanceContext";
import { useEffect } from "react";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";

function TagPayment() {
  const { createTransaction, isPending } = useCreateTransaction();
  const { amount, payment, amountinEth } = useFinance();
  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    const newAmount = amount.replace(/[^\d.]/g, "");

    const transferData = {
      amount: newAmount,
      type: payment,
      details: [
        {
          ...data,
          amountinEth,
        },
      ],
    };

    createTransaction(transferData, {
      onSuccess: () => {
        reset();
        navigate("/dashboard/wallet/success", { state: { type: "invoice" } });
      },
    });
  }

  const image = `/payments/${payment}.${payment === "zelle" ? "jpeg" : "png"}`;

  useEffect(() => {
    if (!amount || !payment) navigate("/dashboard/wallet/fund");
  }, [amount, payment, navigate]);

  if (isPending) return <SpinnerFullPage />;

  return (
    <Container head={`Payment of ${amount}`}>
      <Form handleSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <img
            className="rounded-md h-10"
            src={image}
            alt={`image of ${payment}`}
          />
          <h2> pay via {payment}</h2>
        </div>
        <Formrow name={"Senders Name"} id={"name"} errors={errors}>
          <Input
            disabled={isSubmitting || isPending}
            placeholder={`Please input your Full Name`}
            name={"name"}
            register={register}
            validation={{
              required: "this field is required",
            }}
          />
        </Formrow>
        <Formrow
          name={`${payment} ${payment === "paypal" ? "email" : "handle"} `}
          id={"handle"}
          errors={errors}
        >
          <Input
            disabled={isSubmitting || isPending}
            placeholder={`Please input your ${payment} ${
              payment === "paypal" ? "email or username" : "handle or Phone no"
            }`}
            name={"handle"}
            register={register}
            validation={{
              required: "this field is required",
            }}
          />
        </Formrow>

        <Button
          disabled={isSubmitting || isPending}
          variations={"primary"}
          sizes={"medium"}
        >
          {isSubmitting || isPending ? "submitting" : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default TagPayment;
