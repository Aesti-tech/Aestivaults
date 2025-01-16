import { useState } from "react";
import styles from "./Navbar.module.css"; // Assuming styles for responsiveness
import { Link } from "react-router-dom";
import { FaDollarSign, FaHome, FaUserCheck } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="col-span-2 w-full bg-gray-800 text-white flex justify-between items-center p-4">
      {/* Logo and Hamburger */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png" // Replace with your company logo URL
            alt="Company Logo"
            className="w-10 h-10"
          />
          <h1 className="text-lg font-semibold">Aestivaults</h1>
        </div>
      </div>

      {/* Links in Navbar for Small Screens */}

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg" // Random user image
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <p className={`${styles.username} text-sm font-medium`}>
            Crypto User
          </p>
        </div>
        <button
          className={`${styles.burger} w-auto text-white`}
          onClick={() => setIsSidebarOpen((i) => !i)}
        >
          <span className="text-2xl">&#9776;</span> {/* Hamburger Icon */}
        </button>
      </div>

      <nav className={styles.nav} style={{ right: !isSidebarOpen && "0" }}>
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

export default Navbar;
