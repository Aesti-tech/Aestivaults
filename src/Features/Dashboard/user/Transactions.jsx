import { Link } from "react-router-dom";
import styles from "../../../modules/Transactions.module.css";
import useFetchData from "../../../hooks/useFetchData";
import { useUser } from "../../../hooks/useUser";
import { AiOutlineSwap } from "react-icons/ai";

import { FaLeaf, FaMoneyBill, FaMoneyBillWave } from "react-icons/fa";

function Transactions() {
  const { user } = useUser();
  const { data, isLoading } = useFetchData("Transactions", {
    column: "user_id",
    value: user.id,
  });

  if (isLoading) return null;

  const TransactionsArray = [...data]?.reverse();

  const shownTransactions = TransactionsArray?.slice(0, 5);

  return (
    <div className={styles.transaction} style={{ "--delay": "1.2s" }}>
      {data?.length === 0 ? (
        <NoTransactions />
      ) : (
        <TransactionsList transactions={shownTransactions} />
      )}
    </div>
  );
}

export default Transactions;

function NoTransactions() {
  return (
    <div className="relative">
      <img src="/noTransaction.jpeg" className="" />
      <Link to={"/dashboard/wallet/fund"}>
        <h2 className="inset-0 absolute flex flex-col items-center justify-center text-2xl">
          You have no transactions
          <h3 className="flex items-center gap-x-2">
            Fund acct <FaMoneyBillWave className="text-blue-500" />{" "}
          </h3>
        </h2>
      </Link>
    </div>
  );
}

function TransactionsList({ transactions }) {
  return (
    <>
      <div className={styles.transactionHeader}>
        <div className={styles.head}>Transactions</div>
        <Link to={"/dashboard/wallet"} className={styles.view}>
          View All
        </Link>
      </div>
      {transactions?.map((item) => (
        <div className={`${styles.creditWrapper}`} key={item.id}>
          {getImage(item.type)}

          <div
            className={`${styles.creditMoney} ${
              item.status === "PENDING"
                ? styles.isWait
                : item.status === "APPROVED"
                ? styles.isActive
                : styles.isCancel
            }`}
          >
            {item.amount}
          </div>
        </div>
      ))}
    </>
  );
}

function getImage(item) {
  const img = "h-10 w-10";
  const div = "flex items-center gap-x-2";

  if (item === "Bank Transfer") {
    return (
      <div className={div}>
        <img className={img} src={`/payments/bank.png`} alt="" />
        <p className={styles.creditType}>Bank deposit</p>
      </div>
    );
  }

  if (item === "zelle") {
    return (
      <div className={div}>
        <img className={img} src={`/payments/zelle.jpeg`} alt="" />
        <p className={styles.creditType}>Zelle Deposit</p>
      </div>
    );
  }

  if (item === "cryptowallet") {
    return (
      <div className={div}>
        <img className={img} src={`/payments/wallet.png`} alt="" />
        <p className={styles.creditType}>Crypto wallet Deposit</p>
      </div>
    );
  }

  if (item === "Minted Artwork") {
    return (
      <div className={div}>
        <FaLeaf size={25} />
        <p className={styles.creditType}>{item}</p>
      </div>
    );
  }

  if (item === "inter transfer") {
    return (
      <div className={div}>
        <AiOutlineSwap size={25} />
        <p className={styles.creditType}>Inter Transfer</p>
      </div>
    );
  }

  return (
    <div className={div}>
      <FaMoneyBill size={25} />
      <p className={styles.creditType}>{item}</p>
    </div>
  );
}
