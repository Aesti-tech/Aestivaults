import Container from "../../ui/Container";
import Form from "../../ui/Form";
import Formrow from "../../ui/Formrow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import { useNavigate } from "react-router-dom";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";

function Transfer() {
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
      type: "inter transfer",
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
          state: { type: "Transfer" },
        });
      },
    });
  }

  if (isPending) return <SpinnerFullPage />;
  return (
    <Container head={`Inter-Transfer`}>
      <Form handleSubmit={handleSubmit(onSubmit)}>
        <h2>Transfer to Aestivaults user</h2>
        <Formrow name={"recipient Name"} id={"name"} errors={errors}>
          <Input
            disabled={isPending || isSubmitting}
            placeholder={`Please input recipient Full Name`}
            name={"name"}
            register={register}
            validation={{
              required: "this field is required",
            }}
          />
        </Formrow>
        <Formrow name={`Receipient handle`} id={"handle"} errors={errors}>
          <Input
            disabled={isPending || isSubmitting}
            placeholder={`Please input the receipients handle`}
            name={"handle"}
            register={register}
            validation={{
              required: "this field is required",
            }}
          />
        </Formrow>

        <Formrow name={`Amount`} id={"amount"} errors={errors}>
          <Input
            disabled={isPending || isSubmitting}
            placeholder={`Please input the transfer amount`}
            name={"amount"}
            register={register}
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
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Transfer;
