import { useForm } from "react-hook-form";
import styles from "../../modules/Signup.module.css";
import Button from "../../ui/Button";
import { emailRegex, passwordRegex } from "../../utils/regex";
import { useSignup } from "../../hooks/useSignup";

import Form from "../../ui/Form";
import Formrow from "../../ui/Formrow";
import Input from "../../ui/Input";
import { Link } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const { isCreatingUSer, signUp } = useSignup();

  const password = watch("password");

  function onSubmit(data) {
    signUp(data, { onSettled: () => reset() });
  }

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <img className={styles.logo} src="/logo.png" alt="Aestivaults Logo" />
        <Form handleSubmit={handleSubmit(onSubmit)} action="submit">
          <h2>Sign up to Aestivaults</h2>

          <Formrow name={"Name"} id={"name"} errors={errors}>
            <Input
              disabled={isCreatingUSer || isSubmitting}
              name="name"
              id="name"
              placeholder="What's your name?"
              register={register}
              validation={{
                required: "Please fill in your name",
              }}
            />
          </Formrow>

          <Formrow name={"Email"} id={"email"} errors={errors}>
            <Input
              disabled={isCreatingUSer || isSubmitting}
              name="email"
              id="email"
              placeholder="Enter your email address"
              register={register}
              validation={{
                required: "Please fill in your email",
                pattern: {
                  value: emailRegex,
                  message: "Please enter a valid email",
                },
              }}
            />
          </Formrow>

          <Formrow name={"Password"} id={"password"} errors={errors}>
            <Input
              disabled={isCreatingUSer || isSubmitting}
              name="password"
              id="password"
              placeholder="Enter a password"
              register={register}
              validation={{
                required: "Please fill in a password",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must be at least 8 characters, include an uppercase letter, a number, and a special character",
                },
              }}
            />
          </Formrow>

          <Formrow
            id={"confirmpassword"}
            name={"Confirm Password"}
            errors={errors}
          >
            <Input
              disabled={isCreatingUSer || isSubmitting}
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm your password"
              register={register}
              validation={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
            />
          </Formrow>

          <div className={styles.term}>
            <Input
              disabled={isCreatingUSer || isSubmitting}
              type="checkbox"
              name="agree"
              id="agree"
              register={register}
              validation={{
                validate: (value) =>
                  value || "Please accept the terms and conditions to proceed",
              }}
            />
            <p>I agree to all terms and conditions</p>
          </div>

          <Button
            variations={"primary"}
            sizes={"medium"}
            disabled={isCreatingUSer || isSubmitting}
          >
            Create Account
          </Button>
          <Link className={styles.terms} to="/community/Terms">
            Terms and Conditions
          </Link>
        </Form>
      </div>
    </section>
  );
}

export default Signup;
