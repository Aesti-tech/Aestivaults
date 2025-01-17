import Button from "../../../ui/Button";
import { useUser } from "../../../hooks/useUser";
import styles from "../../../modules/Settings.module.css";
import { useState } from "react";
import useUpdateUser from "../../../hooks/useUpdateUser";
import Form from "../../../ui/Form";
import Formrow from "../../../ui/Formrow";
import Input from "../../../ui/Input";
import toast from "react-hot-toast";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { name },
    },
  } = useUser();

  const [fullName, setFullName] = useState(name);
  const [avatar, setAvatar] = useState(null);

  const { isPending, updateUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) {
      toast.error("please fill in a name to update user Data");
      return;
    }
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handlCancel() {
    setFullName(name);
    setAvatar(null);
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Formrow name={"Email Address"}>
        <Input value={email} disabled />
      </Formrow>

      <Formrow name={"Full Name"}>
        <Input
          type="text"
          value={fullName}
          disabled={isPending}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </Formrow>

      <Formrow name={"Profile Image"}>
        <Input
          type="file"
          id="avatar"
          disabled={isPending}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          className={styles.imageInput}
        />
      </Formrow>

      <Formrow className={styles.formRow}>
        <Button
          onClick={handlCancel}
          disabled={isPending}
          type="reset"
          variations="secondary"
          sizes={"medium"}
        >
          Cancel
        </Button>
        <Button disabled={isPending} variations={"primary"} sizes={"medium"}>
          {isPending ? "updating....." : "Update account"}
        </Button>
      </Formrow>
    </Form>
  );
}

export default UpdateUserDataForm;
