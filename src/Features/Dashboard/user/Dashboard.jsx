import styles from "../../../modules/Dashboard.module.css";
import { useUser } from "../../../hooks/useUser";

import { FaDollarSign, FaLeaf, FaMoneyBillWave } from "react-icons/fa";
import EthereumChart from "./EthereumChart";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import Transactions from "./Transactions";
import useGetAmount from "../../../hooks/useGetAmount";

function Dashboard() {
  const { user } = useUser();
  const { amount } = useGetAmount();

  const { name } = user.user_metadata;
  return (
    <div className={styles.layout}>
      <h2>Hello {name.split(" ")[0]}</h2>

      <div className={styles.dashboard} style={{ "--delay": ".2s" }}>
        <Stat
          title={"Total Balance"}
          color={"yellow-500"}
          icon={<FaDollarSign />}
          value={`$${amount || 0}`}
        />
        <Stat
          title={"Mint Balance"}
          color={"lavender-500"}
          value={"$0"}
          icon={<FaLeaf />}
        />
        <Stat
          title={"Royalties"}
          color={"blue-500"}
          icon={<HiOutlineBadgeCheck />}
          value={"$0"}
        />

        <Stat
          title={"Earnings"}
          color={"green-500"}
          icon={<FaMoneyBillWave />}
          value={"$0"}
        />
        <Transactions />
        <EthereumChart />
      </div>
    </div>
  );
}

export default Dashboard;

function Stat({ icon, title, value, color }) {
  return (
    <div className={styles.stat}>
      <div className={styles.icon} style={{ "--color": `var(--${color})` }}>
        {icon}
      </div>
      <h5>{title}</h5>
      <p>{value}</p>
    </div>
  );
}
