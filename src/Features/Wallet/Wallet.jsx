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
import { MetaMaskIcon } from "../Dashboard/user/Transactions";
import { Link } from "react-router-dom";
import useGetAmount from "../../hooks/useGetAmount";

function Wallet() {
  const { user, isLoading } = useUser();
  const { avatar, name } = user?.user_metadata || {};
  const { amount } = useGetAmount();

  const data = [
    {
      Medium: "Metamask",
      Amount: formatCurrency(4000),
      type: "Deposit",
      status: "confirmed",
      Date: "01-01-25",
    },
    {
      Medium: "Metamask",
      Amount: formatCurrency(4000),
      type: "Transfer",
      status: "confirmed",
      Date: "01-01-25",
    },
    {
      Medium: "Metamask",
      Amount: formatCurrency(4000),
      type: "withdrawal",
      status: "waiting",
      Date: "01-01-25",
    },
    {
      Medium: "Metamask",
      Amount: formatCurrency(4000),
      type: "Transfer",
      status: "Cancelled",
      Date: "01-01-25",
    },
  ];
  const column = [
    { key: "#", label: "" },
    {
      key: "Medium",
      label: "medium",
      render: (item) => (
        <div className={styles.transactionICon}>
          <MetaMaskIcon />
          <div>
            <h3>{item.Medium}</h3>
            <p>{item.type}</p>
          </div>
        </div>
      ),
    },
    { key: "Amount", label: "amount" },
    {
      key: "status",
      label: "status",
      render: (render) => (
        <p className={styles[render.status]}>{render.status}</p>
      ),
    },
    { key: "Date", label: "Date" },
  ];

  if (isLoading) return <SpinnerFullPage />;
  return (
    <div className={styles.container}>
      <h2>Wallet</h2>

      <div className={styles.wallet}>
        <div className={styles.card}>
          <section className={styles.cardHead}>
            <h4>Hello {name.split(" ")[0]}</h4>
            <img src={avatar} alt="" />
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
