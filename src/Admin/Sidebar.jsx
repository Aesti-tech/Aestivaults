import { FaDollarSign, FaHome, FaUserCheck } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.container}>
      <nav className="flex flex-col items-start p-4 space-y-6">
        <Link className={styles.link} to="/admin">
          <FaHome size={20} />
          Dashboard
        </Link>
        <Link className={styles.link} to="/admin/pending">
          <FaDollarSign size={20} />
          Pending Transactions
        </Link>
        <Link className={styles.link} to="/admin/messages">
          <FaMessage size={20} />
          Messaging
        </Link>
        <Link className={styles.link} to="/admin/users">
          <FaUserCheck size={20} />
          User Management
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
