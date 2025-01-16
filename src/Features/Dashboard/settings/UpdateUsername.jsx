import { useUser } from "../../../hooks/useUser";
import Form from "../../../ui/Form";
import Formrow from "../../../ui/Formrow";
import Input from "../../../ui/Input";

function UpdateUsername() {
  const {
    user: {
      user_metadata: { username },
    },
  } = useUser();

  return (
    <Form>
      <h2 style={{ padding: "20px 0" }}>Update userName</h2>
      <Formrow name={"username"}>
        <Input value={username} disabled />
      </Formrow>

      <h3 className="text-sm mt-4 font-semibold">
        Username can only be set during account creation and cant be changed but
        if neccessary please contact support
      </h3>
    </Form>
  );
}

export default UpdateUsername;
