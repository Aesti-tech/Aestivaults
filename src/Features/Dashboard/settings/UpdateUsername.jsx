import Button from "../../../ui/Button";
import { useUser } from "../../../hooks/useUser";
import styles from "../../../modules/Settings.module.css";
import { useState } from "react";
import useUpdateUser from "../../../hooks/useUpdateUser";
import Form from "../../../ui/Form";
import Formrow from "../../../ui/Formrow";
import Input from "../../../ui/Input";
import toast from "react-hot-toast";

function UpdateUsername() {
  const {
    user: {
      user_metadata: { username },
    },
  } = useUser();

  const [newUsername, setNewUsername] = useState("");
  const { isPending, updateUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();

    if (!newUsername) {
      toast.error("please fill in a new username");
      return;
    }
    updateUser(
      { username: newUsername },
      {
        onSuccess: () => {
          e.target.reset();
        },
      }
    );
  }

  function handlCancel() {
    setNewUsername("");
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <h2 style={{ padding: "20px 0" }}>Update userName</h2>
      <Formrow name={"current username"}>
        <Input value={username} disabled />
      </Formrow>

      <Formrow name={"New username"}>
        <Input
          type="text"
          value={newUsername}
          disabled={isPending}
          onChange={(e) => setNewUsername(e.target.value)}
          id="newUSername"
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
          {isPending ? "updating....." : "Update username"}
        </Button>
      </Formrow>
    </Form>
  );
}

export default UpdateUsername;
