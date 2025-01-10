import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "../../modules/Login.module.css";
import Button from "../../ui/Button";
import { emailRegex } from "../../utils/regex";

import { useLogin } from "../../hooks/useLogin";
import Form from "../../ui/Form";
import FormRow from "../../ui/Formrow";
import Input from "../../ui/Input";
import SpinnerFullPage from "../../ui/SpinnerFullPage";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isLogginIn, LoginUSer } = useLogin();

  function onSubmit(data) {
    LoginUSer(data, { onSettled: () => reset() });
  }

  if (isLogginIn) return <SpinnerFullPage />;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.logoWrapper}>
          <img src="/logo.png" alt="Aestivaults Logo" className={styles.logo} />
        </div>

        <h2>Welcome Back</h2>
        <p className={styles.subtitle}>Log in to your Aestivaults account</p>

        <Form handleSubmit={handleSubmit(onSubmit)}>
          <FormRow name={"Email"} id={"email"} errors={errors}>
            <Input
              disabled={isLogginIn || isSubmitting}
              name="email"
              id="email"
              placeholder="Enter your email address"
              register={register}
              validation={{
                required: "This field is required",
                pattern: {
                  value: emailRegex,
                  message: "Please enter a valid email",
                },
              }}
            />
          </FormRow>

          <FormRow name={"Password"} id={"password"} errors={errors}>
            <Input
              disabled={isLogginIn || isSubmitting}
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              register={register}
              validation={{
                required: "Password is required",
              }}
            />
          </FormRow>

          <Button
            variations={"primary"}
            sizes={"medium"}
            disabled={isLogginIn || isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <p className={styles.signupPrompt}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
