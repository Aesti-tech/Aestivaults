import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import useUpdateUser from "../../../hooks/useUpdateUser";
import Form from "../../../ui/Form";
import Formrow from "../../../ui/Formrow";
import Input from "../../../ui/Input";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form handleSubmit={handleSubmit(onSubmit)}>
      <Formrow name={"New password"} errors={errors} id={"password"}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          register={register}
          name={"password"}
          validation={{
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          }}
        />
      </Formrow>

      <Formrow name={"Confirm Password"} id={"passwordConfirm"} errors={errors}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          name={"passwordConfirm"}
          disabled={isUpdating}
          register={register}
          validation={{
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          }}
        />
      </Formrow>

      <Formrow>
        <Button
          onClick={reset}
          type="reset"
          sizes={"medium"}
          variations="secondary"
        >
          Cancel
        </Button>
        <Button sizes={"medium"} variations={"primary"} disabled={isUpdating}>
          Update password
        </Button>
      </Formrow>
    </Form>
  );
}

export default UpdatePasswordForm;
