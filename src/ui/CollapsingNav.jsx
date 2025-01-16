import { useState } from "react";
import styles from "../modules/CollapsingNav.module.css";
import useHandleClick from "../hooks/useHandleClick";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUserPlus, FaWallet } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaCartShopping, FaMessage } from "react-icons/fa6";
import useGetUser from "../hooks/useGetUser";
import Button from "./Button";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "../hooks/DarkModeContext";

function CollapsingNav() {
  const [shownav, setShowNav] = useState(false);

  const { isAuthenticated } = useGetUser();

  function handleClick(e) {
    e.stopPropagation();
    setShowNav((nav) => !nav);
  }

  const ref = useHandleClick(() => setShowNav(false));

  const { isDarkMode } = useDarkMode();

  return (
    <div ref={ref}>
      <div
        className={`${styles.hamMenu} ${shownav ? styles.active : ""}`}
        onClick={handleClick}
      >
        <span className={styles.span}></span>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
      </div>

      <nav className={`${styles.nav} ${shownav ? styles.active : ""}`}>
        <Link
          className={styles.navLink}
          onClick={handleClick}
          to={"/dashboard"}
        >
          <FaUserCircle /> Dashboard
        </Link>
        <Link
          className={styles.navLink}
          onClick={handleClick}
          to={"/dashboard/collection"}
        >
          {" "}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Collections
        </Link>
        <Link
          className={styles.navLink}
          onClick={handleClick}
          to={"/dashboard/wallet"}
        >
          <FaWallet /> Wallet
        </Link>

        <Link
          className={styles.navLink}
          onClick={handleClick}
          to={"/dashboard/messages"}
        >
          <FaMessage /> Messages
        </Link>

        <Link className={styles.navLink} onClick={handleClick} to={"/market"}>
          <FaCartShopping /> Market
        </Link>
        <Link className={styles.navLink} onClick={handleClick} to={"/explore"}>
          <FaCompass /> Explore
        </Link>
        <Link
          className={styles.navLink}
          onClick={handleClick}
          to={"/dashboard/settings"}
        >
          <svg viewBox="0 0 512 512" fill="currentColor">
            <path d="M272 512h-32c-26 0-47.2-21.1-47.2-47.1V454c-11-3.5-21.8-8-32.1-13.3l-7.7 7.7a47.1 47.1 0 01-66.7 0l-22.7-22.7a47.1 47.1 0 010-66.7l7.7-7.7c-5.3-10.3-9.8-21-13.3-32.1H47.1c-26 0-47.1-21.1-47.1-47.1v-32.2c0-26 21.1-47.1 47.1-47.1H58c3.5-11 8-21.8 13.3-32.1l-7.7-7.7a47.1 47.1 0 010-66.7l22.7-22.7a47.1 47.1 0 0166.7 0l7.7 7.7c10.3-5.3 21-9.8 32.1-13.3V47.1c0-26 21.1-47.1 47.1-47.1h32.2c26 0 47.1 21.1 47.1 47.1V58c11 3.5 21.8 8 32.1 13.3l7.7-7.7a47.1 47.1 0 0166.7 0l22.7 22.7a47.1 47.1 0 010 66.7l-7.7 7.7c5.3 10.3 9.8 21 13.3 32.1h10.9c26 0 47.1 21.1 47.1 47.1v32.2c0 26-21.1 47.1-47.1 47.1H454c-3.5 11-8 21.8-13.3 32.1l7.7 7.7a47.1 47.1 0 010 66.7l-22.7 22.7a47.1 47.1 0 01-66.7 0l-7.7-7.7c-10.3 5.3-21 9.8-32.1 13.3v10.9c0 26-21.1 47.1-47.1 47.1zM165.8 409.2a176.8 176.8 0 0045.8 19 15 15 0 0111.3 14.5V465c0 9.4 7.7 17.1 17.1 17.1h32.2c9.4 0 17.1-7.7 17.1-17.1v-22.2a15 15 0 0111.3-14.5c16-4.2 31.5-10.6 45.8-19a15 15 0 0118.2 2.3l15.7 15.7a17.1 17.1 0 0024.2 0l22.8-22.8a17.1 17.1 0 000-24.2l-15.7-15.7a15 15 0 01-2.3-18.2 176.8 176.8 0 0019-45.8 15 15 0 0114.5-11.3H465c9.4 0 17.1-7.7 17.1-17.1v-32.2c0-9.4-7.7-17.1-17.1-17.1h-22.2a15 15 0 01-14.5-11.2c-4.2-16.1-10.6-31.6-19-45.9a15 15 0 012.3-18.2l15.7-15.7a17.1 17.1 0 000-24.2l-22.8-22.8a17.1 17.1 0 00-24.2 0l-15.7 15.7a15 15 0 01-18.2 2.3 176.8 176.8 0 00-45.8-19 15 15 0 01-11.3-14.5V47c0-9.4-7.7-17.1-17.1-17.1h-32.2c-9.4 0-17.1 7.7-17.1 17.1v22.2a15 15 0 01-11.3 14.5c-16 4.2-31.5 10.6-45.8 19a15 15 0 01-18.2-2.3l-15.7-15.7a17.1 17.1 0 00-24.2 0l-22.8 22.8a17.1 17.1 0 000 24.2l15.7 15.7a15 15 0 012.3 18.2 176.8 176.8 0 00-19 45.8 15 15 0 01-14.5 11.3H47c-9.4 0-17.1 7.7-17.1 17.1v32.2c0 9.4 7.7 17.1 17.1 17.1h22.2a15 15 0 0114.5 11.3c4.2 16 10.6 31.5 19 45.8a15 15 0 01-2.3 18.2l-15.7 15.7a17.1 17.1 0 000 24.2l22.8 22.8a17.1 17.1 0 0024.2 0l15.7-15.7a15 15 0 0118.2-2.3z" />
            <path d="M256 367.4c-61.4 0-111.4-50-111.4-111.4s50-111.4 111.4-111.4 111.4 50 111.4 111.4-50 111.4-111.4 111.4zm0-192.8a81.5 81.5 0 000 162.8 81.5 81.5 0 000-162.8z" />
          </svg>
          Settings
        </Link>

        <div className="flex items-center gap-4">
          <DarkModeToggle className={styles.darkMode} />

          <h3>{isDarkMode ? "Light Theme" : "Dark Theme"}</h3>
        </div>

        {!isAuthenticated ? (
          <div className={styles.btnContainer}>
            <Link
              onClick={handleClick}
              className={styles.navLinkBtn}
              to={"/signup"}
            >
              <Button variations={"primary"} sizes={"large"}>
                Sign up <FaUserPlus />
              </Button>
            </Link>
            <Link
              onClick={handleClick}
              className={styles.navLinkBtn}
              to={"/login"}
            >
              <Button variations={"primary"} sizes={"large"}>
                Login <FaUserCircle />
              </Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
}

export default CollapsingNav;
