import styles from "../modules/NavBar.module.css";

import { Link, NavLink } from "react-router-dom";
import { FaCompass, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { FaCartPlus, FaUserPlus } from "react-icons/fa6";
import CollapsingNav from "./CollapsingNav";
import useGetUser from "../hooks/useGetUser";
import UserDisplay from "./UserDisplay";

function NavBar() {
  const { isAuthenticated } = useGetUser();

  return (
    <nav className={`${styles.navBar}`}>
      <div className={styles.header} style={{ "--delay": "1s" }}>
        <Link className={styles.logo}>
          <img className={styles.logoImg} src="/logo.png" alt="" />
          <span className={styles.logoDet}>AestiVaults</span>
        </Link>

        <NavLink className={styles.headerLink} to="/explore">
          <FaCompass /> <span>explore</span>
        </NavLink>
        <NavLink className={styles.headerLink} to="/market">
          <FaCartPlus /> <span>Market Place</span>
        </NavLink>
        <div className={styles.userInfo}>
          {isAuthenticated ? <UserDisplay /> : <Login />}
        </div>

        <CollapsingNav />
      </div>
    </nav>
  );
}

export default NavBar;

function Login() {
  return (
    <>
      <Link to={"/signup"}>
        <button className={styles.button}>
          Sign up <FaUserPlus />
        </button>
      </Link>
      <Link to={"/login"} className={styles.login}>
        <button className={styles.button}>
          Login <FaUserCircle />
        </button>
      </Link>
      <button className={styles.icon}>
        <FaShoppingBag />
      </button>
    </>
  );
}
