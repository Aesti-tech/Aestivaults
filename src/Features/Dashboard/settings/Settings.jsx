import styles from "../../../modules/Settings.module.css";
import ToggleDarkMode from "./ToggleDarkMode";
import UpdatePasswordForm from "./updatePassword";
import UpdateUserDataForm from "./UpdateUserDataForm";
import UpdateUsername from "./UpdateUsername";

function Settings() {
  return (
    <section className={styles.settings}>
      <h2>Settings</h2>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
      <UpdateUsername />
      <ToggleDarkMode />
    </section>
  );
}

export default Settings;
