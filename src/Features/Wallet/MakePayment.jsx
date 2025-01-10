import { useNavigate, useParams } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";
import styles from "../../modules/MakePayment.module.css";
import { useEffect, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import useGetWallet from "../../hooks/useGetWallet";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";

function Timer() {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the interval to decrease timeLeft every second
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval); // Stop the timer when it reaches 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      toast.error("Time Expired for transfer Please reinitiate!!");

      navigate("/dashboard/wallet/fund");
    }
  }, [timeLeft, navigate]);

  // Format the timeLeft into HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return <p className={styles.time}>Time remaining {formatTime(timeLeft)}</p>;
}

function MakePayment() {
  const { amount, payment, amountinEth } = useFinance();
  const { createTransaction, isPending } = useCreateTransaction();
  const { data, isLoading } = useGetWallet();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!amount) navigate("/dashboard/wallet/fund");
  }, [amount, navigate]);

  function handleCopy() {
    const walletAddress = "0x9a9575a7eb0c1d7f2043c117680935d0ec3d7f27";

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(walletAddress)
        .then(() => {
          toast.success("Wallet address copied to clipboard");
        })
        .catch((err) => {
          console.error("Error copying text: ", err);
          toast.error("Failed to copy address. Please try manually.");
        });
    } else {
      // Fallback for unsupported browsers
      const textarea = document.createElement("textarea");
      textarea.value = walletAddress;
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px"; // Move off-screen
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        toast.success("Wallet address copied to clipboard");
      } catch (err) {
        console.error("Fallback copy failed: ", err);
        toast.error("Failed to copy address. Please try manually.");
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  function handleSubmit() {
    const newAmount = amount.replace(/[^\d.]/g, "");

    const transferData = {
      amount: newAmount,
      type: payment,
      details: [
        {
          wallet: id,
          amountinEth,
        },
      ],
    };

    createTransaction(transferData, {
      onSuccess: () => {
        navigate("/dashboard/wallet/success", { state: { type: "Deposit" } });
      },
    });
  }

  if (isLoading || isPending) return <SpinnerFullPage />;

  return (
    <div className={styles.container}>
      <div>
        <h2>Make Deposit</h2>
        <Timer />
      </div>

      <div className={styles.payment}>
        <div className={styles.address}>
          <h3>payment amount {` ${amount}`}</h3>

          <img src="/eth.jpeg" className={styles.ethereum} />
          <h4>
            Ethereum Wallet Address <span>Network:ERC-20</span>
          </h4>
          <span>
            Only Ethereum should be sent to the ethereum Wallet address below!!
          </span>
          <Input value={data[0].address} disabled />
          <Button onClick={handleCopy} variations={"primary"} sizes={"large"}>
            Copy Address
          </Button>
        </div>

        <div className={styles.code}>
          <h3>Payment Qr Code</h3>
          <div className={styles.image}>
            <img src={data[0].image} />
          </div>
        </div>

        <div className={styles.confirm}>
          <Button
            onClick={handleSubmit}
            variations={"secondary"}
            sizes={"large"}
          >
            ConFirm Deposit of {amount}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MakePayment;
