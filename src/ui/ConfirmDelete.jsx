import Button from "./Button";
import { useModal } from "./Modal";
import styles from "../modules/ConfirmDelete.module.css";

function ConfirmDelete({ children, onConfirm, disabled, action }) {
  const { close } = useModal();

  return (
    <div className={styles.container}>
      <h3>{children}</h3>

      <div>
        <Button
          onClick={close}
          variations="secondary"
          sizes={"medium"}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            close();
          }}
          variations="danger"
          sizes={"medium"}
          disabled={disabled}
        >
          {action}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
