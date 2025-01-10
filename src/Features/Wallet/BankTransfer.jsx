import { Controller, useForm } from "react-hook-form";
import styles from "../../modules/BankTransfer.module.css";
import Flag from "react-world-flags";
import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Form from "../../ui/Form";
import Formrow from "../../ui/Formrow";
import Input from "../../ui/Input";
import Select from "react-select";
import { HiXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import { useNavigate } from "react-router-dom";
import { supportedCountries } from "../../services/Constants";
import { useFinance } from "../../context/FinanceContext";

function BankTransfer() {
  const [showNotice, setShowNotice] = useState(true);
  const { createTransaction, isPending } = useCreateTransaction();

  const { amount, payment, amountinEth } = useFinance();
  const navigate = useNavigate();

  useEffect(() => {
    if (!amount || !payment) navigate("/dashboard/wallet/fund");
  }, [amount, payment, navigate]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  function onSubmit(data) {
    const selectedCountry = supportedCountries.find(
      (country) => country.value === data.location?.value
    );

    const newAmount = amount.replace(/[^\d.]/g, "");

    const transferData = {
      amount: newAmount,
      type: payment,
      details: [
        {
          ...data,
          amountinEth,
          location: selectedCountry ? selectedCountry.label : null,
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

  if (isPending) return <SpinnerFullPage />;

  return (
    <Container head={"Bank Transfer"}>
      <div className={styles.container}>
        {showNotice && (
          <div className={styles.notice}>
            <div className={styles.noticeHead}>
              <h3>Attention!!!</h3>
              <button onClick={() => setShowNotice(false)}>
                <HiXMark />
              </button>
            </div>
            <p>
              We are pleased to inform you that our company collaborates with
              trusted third-party Merchant Service Providers to ensure secure
              and efficient deposit transactions. These merchants act as
              intermediaries to receive your funds and facilitate the deposit
              process seamlessly. Please note that, as this involves a
              third-party service, it may take some time for the transaction to
              reflect on your dashboard or wallet. While many transactions are
              processed quickly, we advise allowing up to 24 hours for the
              deposit to be fully confirmed and visible on your account. We want
              to assure you that this process is safe, secure, and closely
              monitored to guarantee the protection of your funds and personal
              information.
            </p>
            <h5>
              Once you’ve filled in the required details below, kindly proceed,
              and our team, in collaboration with our merchant partners, will
              handle the rest efficiently. Thank you for your trust in our
              services. If you encounter any challenges or have questions,
              please do not hesitate to contact our support team. Your security
              and satisfaction remain our top priorities.
            </h5>
          </div>
        )}

        <Form handleSubmit={handleSubmit(onSubmit)}>
          <h2>Sender Details</h2>
          <Formrow name={"Account Name"} errors={errors} id={"account_name"}>
            <Input
              disabled={isSubmitting}
              placeholder={"Please input your account name"}
              name={"account_name"}
              register={register}
              validation={{
                required: "Account Name is required",
              }}
            />
          </Formrow>
          <Formrow
            name={"Account Number"}
            id={"account_number"}
            errors={errors}
          >
            <Input
              disabled={isSubmitting}
              placeholder={"Please input your account number"}
              register={register}
              name={"account_number"}
              validation={{
                required: "Account no is required",
                pattern: {
                  value: /^\d+$/,
                  message: "please input a valid account No",
                },
              }}
            />
          </Formrow>
          <Formrow name={"Bank Name"} id={"customer_bank"} errors={errors}>
            <Input
              disabled={isSubmitting}
              placeholder={"Please input your Bank name"}
              name={"customer_bank"}
              register={register}
              validation={{
                required: "Bank Name is required",
              }}
            />
          </Formrow>
          <Formrow name={"Location"} errors={errors} id={"location"}>
            <Controller
              name="location"
              control={control}
              defaultValue={""}
              rules={{ required: "Please select your location" }}
              render={({ field }) => (
                <Select
                  options={supportedCountries.map((country, index) => ({
                    label: (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Flag
                          code={country.value}
                          style={{ width: 20, height: 15, marginRight: 10 }}
                        />
                        <h5 className={styles.label}>{country.label}</h5>
                      </div>
                    ),
                    value: country.value,
                  }))}
                  isSearchable={false}
                  {...field}
                  className={styles.select}
                  classNamePrefix="custom-select"
                  placeholder="please select your country..."
                />
              )}
            />
          </Formrow>

          <Button
            disabled={isSubmitting}
            variations={"primary"}
            sizes={"large"}
          >
            Proceed
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default BankTransfer;
