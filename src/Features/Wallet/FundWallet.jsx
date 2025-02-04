import { FaEthereum, FaMoneyBill } from "react-icons/fa";
import styles from "../../modules/FundWallet.module.css";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { useFinance } from "../../context/FinanceContext";
import useEthereumChart from "../Dashboard/user/useEthereumChart";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { formatToCurrency } from "../../utils/helpers";
import Container from "../../ui/Container";

function FundWallet() {
  const { dispatch, amount, payment } = useFinance();
  const { currentEthPrice } = useEthereumChart();
  const amountinEth = (amount.replace(/[^0-9]/g, "") / currentEthPrice).toFixed(
    3
  );
  const handleChange = (e) => {
    const input = e.target.value;
    const cursorPosition = e.target.selectionStart;
    const rawValue = input.replace(/[^\d.]/g, "");
    const formattedValue = formatToCurrency(rawValue);

    // Set the formatted value
    dispatch({
      type: "Deposit",
      payload: {
        amount: formattedValue,
        payment: payment,
      },
    });

    const diff = formattedValue.length - input.length;
    const newCursorPosition = cursorPosition + diff;
    setTimeout(() => {
      e.target.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount) {
      toast.error("Deposit amount cannot be empty");
      return;
    }
    if (!payment) {
      toast.error("Please select a payment option to proceed");
      return;
    }

    dispatch({
      type: "setEth",
      payload: { amountinEth },
    });

    navigate(`/dashboard/wallet/fund/${payment}`);
  }

  const location = useLocation();
  if (location.pathname !== "/dashboard/wallet/fund") return <Outlet />;

  return (
    <Container head={"Fund wallet"}>
      <div className={styles.fund}>
        <form onSubmit={handleSubmit}>
          <div className={styles.deposit}>
            <h3 htmlFor="Amount">
              Deposit amount <FaMoneyBill />
            </h3>
            <Input
              id="Amount"
              placeholder="How much do you want to deposit"
              value={amount}
              onChange={handleChange}
            />
            {amount && (
              <p className={styles.eth}>
                {`Value in Ethereum ${amountinEth}`} <FaEthereum />
              </p>
            )}

            <PaymentOptions />

            <Button disabled={!amount} variations="primary" sizes="large">
              Deposit
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default FundWallet;

function PaymentOptions() {
  const { dispatch, payment } = useFinance();

  const setPayment = (value) => {
    dispatch({ type: "Setpayment", payload: value });
  };

  return (
    <div className={styles.options}>
      <div>
        <h3>Payment options</h3>
        <h5>Please select one to proceed</h5>
      </div>

      <div
        onClick={() => setPayment("Bank Transfer")}
        className={`${styles.payment} ${
          payment === "Bank Transfer" ? styles.active : ""
        }`}
      >
        <img src="/payments/bank.png" alt="Bank Transfer" />
        <h4>Bank Transfer</h4>
      </div>
      <div
        onClick={() => setPayment("cryptowallet")}
        className={`${styles.payment} ${
          payment === "cryptowallet" ? styles.active : ""
        }`}
      >
        <img src="/payments/wallet.png" alt="Wallet" />
        <h4>Wallets</h4>
      </div>
      <div
        onClick={() => setPayment("zelle")}
        className={`${styles.payment} ${
          payment === "zelle" ? styles.active : ""
        }`}
      >
        <img src="/payments/zelle.jpeg" alt="Zelle" />
        <h4>Zelle</h4>
      </div>
      <div
        onClick={() => setPayment("cashapp")}
        className={`${styles.payment} ${
          payment === "cashapp" ? styles.active : ""
        }`}
      >
        <img src="/payments/cashapp.png" alt="Cashapp" />
        <h4>Cashapp</h4>
      </div>
      <div
        onClick={() => setPayment("paypal")}
        className={`${styles.payment} ${
          payment === "paypal" ? styles.active : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 469.351 469.351"
          style={{ backgroundColor: "#0365b3" }}
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M356.626 85.086a37.887 37.887 0 00-38.763-8.277 10.668 10.668 0 00-7.168 8.533l-2.987 20.523c-4.529 30.998-31.052 54.019-62.379 54.144h-42.667a10.666 10.666 0 00-10.347 8.085l-32 128a10.667 10.667 0 0010.346 13.248h53.333a10.666 10.666 0 0010.347-8.085l19.307-77.248h41.6c31.934.106 59.792-21.66 67.413-52.672l7.872-31.552a56.099 56.099 0 00-13.907-54.699z"
            fill="#e6f0f9"
            data-original="#03a9f4"
          />
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.664 437.342C4.773 437.341-.002 432.564 0 426.673c0-.869.107-1.735.317-2.578l10.667-42.453v-.448l10.667-42.432a10.666 10.666 0 0110.347-8.085h27.136c14.728-.003 26.669 11.933 26.673 26.661 0 2.181-.267 4.354-.795 6.47l-2.667 10.667c-2.967 11.875-13.637 20.205-25.877 20.203H29.672l-8.64 34.581a10.667 10.667 0 01-10.368 8.083zm24.341-64h21.461a5.335 5.335 0 005.163-4.053l2.667-10.667a5.311 5.311 0 00-5.163-6.634H40.338l-5.333 21.354zM124.733 437.342h-15.189c-16.33.004-29.571-13.231-29.575-29.561a29.56 29.56 0 01.882-7.175l1.408-5.675c3.157-12.736 14.612-21.662 27.733-21.611h15.189c16.33.028 29.545 13.289 29.517 29.619a29.561 29.561 0 01-.887 7.138l-1.408 5.675c-3.16 12.705-14.579 21.614-27.67 21.59zm-23.168-31.552a8.234 8.234 0 007.979 10.219h15.189a7.147 7.147 0 006.955-5.419l1.408-5.675a8.234 8.234 0 00-7.979-10.219h-15.189a7.147 7.147 0 00-6.955 5.419l-1.408 5.675z"
              fill="#fff"
              data-original="#283593"
            />
            <path
              d="M138.664 437.342a10.667 10.667 0 01-10.347-13.248l10.667-42.667c1.426-5.72 7.218-9.202 12.939-7.776 5.72 1.426 9.202 7.218 7.776 12.939l-10.667 42.667a10.666 10.666 0 01-10.368 8.085z"
              fill="#fff"
              data-original="#283593"
            />
          </g>
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M266.664 437.342a10.667 10.667 0 01-10.347-13.248l10.667-42.453v-.448l10.667-42.432a10.666 10.666 0 0110.347-8.085h27.136c14.728-.003 26.669 11.933 26.673 26.661 0 2.181-.267 4.354-.795 6.47l-2.667 10.667c-2.967 11.875-13.637 20.205-25.877 20.203h-26.795l-8.64 34.581a10.669 10.669 0 01-10.369 8.084zm24.341-64h21.483a5.335 5.335 0 005.163-4.053l2.667-10.667a5.312 5.312 0 00-5.163-6.634h-18.816l-5.334 21.354zM380.733 437.342h-15.189c-16.33.004-29.571-13.231-29.575-29.561a29.56 29.56 0 01.882-7.175l1.408-5.675c3.157-12.736 14.612-21.662 27.733-21.611h15.189c16.33-.004 29.571 13.231 29.575 29.561a29.56 29.56 0 01-.882 7.175l-1.408 5.675c-3.157 12.736-14.612 21.662-27.733 21.611zm-23.168-31.552a8.234 8.234 0 007.979 10.219h15.189a7.147 7.147 0 006.955-5.419l1.408-5.675a8.234 8.234 0 00-7.979-10.219h-15.189a7.147 7.147 0 00-6.955 5.419l-1.408 5.675z"
              fill="#e6f0f9"
              data-original="#03a9f4"
            />
            <path
              d="M394.664 437.342a10.667 10.667 0 01-10.347-13.248l10.667-42.667c1.426-5.72 7.218-9.202 12.939-7.776 5.72 1.426 9.202 7.218 7.776 12.939l-10.667 42.667a10.666 10.666 0 01-10.368 8.085z"
              fill="#e6f0f9"
              data-original="#03a9f4"
            />
          </g>
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M202.664 426.676a10.668 10.668 0 01-8.875-4.757l-21.333-32c-3.27-4.901-1.947-11.525 2.955-14.795s11.525-1.947 14.795 2.955l21.333 32c3.275 4.897 1.961 11.521-2.935 14.797a10.681 10.681 0 01-5.94 1.8z"
              fill="#fff"
              data-original="#283593"
            />
            <path
              d="M181.33 458.676c-5.891-.002-10.665-4.78-10.663-10.671a10.667 10.667 0 012.471-6.823l53.333-64c3.776-4.524 10.505-5.131 15.029-1.355 4.524 3.776 5.131 10.505 1.355 15.029l-53.333 64a10.663 10.663 0 01-8.192 3.82z"
              fill="#fff"
              data-original="#283593"
            />
          </g>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M437.33 437.342a10.667 10.667 0 01-10.347-13.248l21.333-85.333c1.426-5.72 7.218-9.202 12.939-7.776 5.72 1.426 9.202 7.218 7.776 12.939l-21.333 85.333a10.665 10.665 0 01-10.368 8.085z"
            fill="#e6f0f9"
            data-original="#03a9f4"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M321.405 29.129a53.908 53.908 0 00-40.661-18.453H159.997a10.666 10.666 0 00-10.496 8.768L106.834 254.11c-1.049 5.797 2.801 11.346 8.598 12.395.626.113 1.262.17 1.898.17h64a10.666 10.666 0 0010.347-8.085l19.328-77.248h34.325c41.958-.165 77.478-31.012 83.52-72.533l5.333-36.459a54.332 54.332 0 00-12.778-43.221z"
            fill="#fff"
            data-original="#283593"
          />
        </svg>
        <h4>Paypal</h4>
      </div>
    </div>
  );
}
