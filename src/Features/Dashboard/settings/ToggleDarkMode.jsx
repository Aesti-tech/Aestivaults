import styles from "../../../modules/Settings.module.css";
import Button from "../../../ui/Button";
import { logout } from "../../../services/Authentication/auth";
import { useNavigate } from "react-router-dom";

function ToggleDarkMode() {
  const navigate = useNavigate("");
  return (
    <div className={styles.darkMode}>
      <Button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        variations={"danger"}
        sizes={"medium"}
      >
        Logout
      </Button>
    </div>
  );
}

export default ToggleDarkMode;
