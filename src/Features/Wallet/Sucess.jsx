import { FaArrowLeft } from "react-icons/fa";
import Button from "../../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../modules/BankTransfer.module.css";

function Sucess() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.state.type === "invoice")
    return (
      <div className={styles.success}>
        <h2>Invoice created successfully!!</h2>
        <h4>
          Please check your email or messages on the site you will receive it
          shortly{" "}
        </h4>
        <p>usually takes less than 24hrs</p>

        <Button
          variations={"primary"}
          sizes={"large"}
          onClick={() => navigate("/dashboard/user")}
        >
          <FaArrowLeft /> Dashboard
        </Button>
      </div>
    );

  if (location.state.type === "Transfer")
    return (
      <div className={styles.success}>
        <h2>Transfer successful!!</h2>
        <h4>amount will be deducted from your wallet once approved</h4>

        <Button
          variations={"primary"}
          sizes={"large"}
          onClick={() => navigate("/dashboard/user")}
        >
          <FaArrowLeft /> Dashboard
        </Button>
      </div>
    );

  return (
    <div className={styles.success}>
      <h2>{location.state.type} successful!!</h2>
      <h4>it will reflect on your dashboard shortly!!</h4>

      <Button
        variations={"primary"}
        sizes={"large"}
        onClick={() => navigate("/dashboard/user")}
      >
        <FaArrowLeft /> Dashboard
      </Button>
    </div>
  );
}

export default Sucess;
