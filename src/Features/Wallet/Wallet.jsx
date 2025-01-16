import { useUser } from "../../hooks/useUser";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import styles from "../../modules/Wallet.module.css";
import { IoMdCash } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";
import { HiOutlineCash } from "react-icons/hi";

import { useDarkMode } from "../../hooks/DarkModeContext";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../utils/helpers";
import Table from "../../ui/Table";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useGetAmount from "../../hooks/useGetAmount";
import useFetchData from "../../hooks/useFetchData";
import { FaLeaf, FaMoneyBill } from "react-icons/fa";
import { CheckCircle } from "lucide-react";

function Wallet() {
  const { user } = useUser();
  const { avatar, name, verified } = user?.user_metadata || {};
  const { amount } = useGetAmount();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: Transactions, isLoading } = useFetchData("Transactions", {
    column: "user_id",
    value: user.id,
  });

  function getDate(isoDate) {
    const date = new Date(isoDate);

    const readableDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    return readableDate;
  }

  function handleReceipt(id) {
    navigate(`/dashboard/wallet/receipt/${id}`);
  }

  if (isLoading) return null;
  if (location.pathname !== "/dashboard/wallet") return <Outlet />;

  const shownTransactions = [...Transactions]?.reverse();

  const data = shownTransactions.map((item) => {
    return {
      Medium: item.type,
      Amount: `$${item.amount}`,
      status: item.status,
      Date: item.created_at,
      id: item.id,
    };
  });

  const column = [
    { key: "#", render: (_, i) => i + 1 },
    {
      key: "Medium",
      label: "medium",
      render: (item) => (
        <div
          onClick={() => handleReceipt(item.id)}
          className={styles.transactionICon}
        >
          <>{getItem(item.Medium)}</>
        </div>
      ),
    },
    {
      key: "Amount",
      label: "amount",
    },
    {
      key: "status",
      label: "status",
      render: (render) => (
        <p className={`${styles[render.status]}`}>{render.status}</p>
      ),
    },
    {
      key: "Date",
      label: "Date",
      render: (item) => <p>{getDate(item.Date)}</p>,
    },
  ];

  if (isLoading) return <SpinnerFullPage />;
  return (
    <div className={styles.container}>
      <h2>Wallet</h2>

      <div className={styles.wallet}>
        <div className={styles.card}>
          <section className={styles.cardHead}>
            <h4 className="flex items-center gap-x-2">
              Hello {name.split(" ")[0]}{" "}
              {verified && (
                <CheckCircle className="w-6 h-6 text-purple-500 sm:mt-0 mt-1" />
              )}
            </h4>
            <img
              className={`${styles[verified]}  ${styles.avatar}`}
              src={avatar}
              alt=""
            />
          </section>
          <div>
            <h5>
              Total Balance: <span> {formatCurrency(amount)} </span>
            </h5>
          </div>

          <Link to={"/dashboard/wallet/fund"} className={styles.action}>
            Fund Wallet
            <HiOutlineCash size={24} />
          </Link>
        </div>

        <EarningsChart data={[]} amount={amount} />

        <div className={`${styles.cardAction} ${styles.card}`}>
          <Link className={styles.action} to={"/dashboard/wallet/fund"}>
            Fund Wallet
            <HiOutlineCash size={24} />
          </Link>

          <Link className={styles.action} to={"/dashboard/wallet/withdraw"}>
            Withdraw <IoMdCash />
          </Link>

          <Link className={styles.action} to={"/dashboard/wallet/transfer"}>
            Inter-Transfer <AiOutlineSwap />
          </Link>
        </div>
      </div>

      <div className={styles.transactions}>
        <h2>Transactions</h2>

        <div className={styles.transactContainer}>
          <Table>
            <Table.Head
              extraColumns="1fr "
              columns={["#", "Medium", "Amount", "status", "Date", ""]}
            ></Table.Head>
            <Table.Body
              data={data}
              columns={column}
              extraColumns="1fr"
            ></Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Wallet;

const EarningsChart = ({ amount }) => {
  const { isDarkMode } = useDarkMode();
  // Dummy data for earnings
  const lightData = [
    { name: "Transfers", value: 0, color: "#84cc16" },
    { name: "Deposits", value: Number(amount), color: "#eab308" },
    { name: "Other", value: 0, color: "#f97316" },
  ];

  const darkData = [
    { name: "Transfers", value: 0, color: "#4d7c0f" },
    { name: "Deposits", value: Number(amount), color: "#a16207" },
    { name: "Other", value: 0, color: "#c2410c" },
  ];

  // Use the provided data or default to dummy data
  const chartData = isDarkMode ? darkData : lightData;

  // Calculate total earnings for display
  const totalEarnings = chartData.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <div className={styles.card}>
      <h4>Earnings: {formatCurrency(totalEarnings)}</h4>
      <ResponsiveContainer width={"100%"} height={240}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx={"40%"}
            cy={"50%"}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="left"
            layout="vertical"
            iconType="circle"
            wrapperStyle={{
              padding: "10px",
              fontSize: "14px",
              color: "var(--black-800)",
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

function getItem(item) {
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
      <FaMoneyBill />
      <p className={styles.creditType}>{item}</p>
    </div>
  );
}
