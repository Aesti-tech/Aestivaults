import styles from "../modules/Footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={`bg-black/30 backdrop-blur-md ${styles.footer}`}>
      <div className={styles.about}>
        <div className={styles.img}></div>
        <p>
          Discover a Aesthetic Vault of Timeless Treasures. Secure, Mint, and
          Own Unique Digital Creations in the Crypto Realm.
        </p>
      </div>
      <div className={styles.vaults}>
        <h4>Aestivaults</h4> <Link to={"/explore"}>Explore</Link>
        <Link to={"/dashboard/wallet"}>Wallet</Link>
        <Link to={"/resources"}>What is NFT</Link>
        <Link to={"/resources#crypto"}>What is a Crypto-Wallet</Link>{" "}
        <Link to={"/community/guides"}>User&apos;s Guide</Link>
      </div>
      <div className={styles.community}>
        <h4>Community</h4>
        <Link to="/community">About Us</Link>
        <Link>Terms & Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link>{" "}
        <Link to={"/login"}>Login</Link>
      </div>
      <div className={styles.contact}>
        <h4>Contact us</h4>
        <p>42 Grey Street Newcastle upon Tyne NE1 6AE</p>
        <div className={styles.socials}>
          <FaFacebook /> <FaInstagram /> <FaTwitter />
        </div>
      </div>
      <hr className={styles.line} />
      <p className={styles.footerText}>
        Copyright &copy; AestiVaults {new Date().getFullYear()}.
      </p>
    </div>
  );
}

export default Footer;
