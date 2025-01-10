import styles from "../../modules/CryptoWallet.module.css";
import { wallets } from "../../services/Constants";
import Button from "../../ui/Button";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function CryptoWallet() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname !== "/dashboard/wallet/fund/cryptowallet")
    return <Outlet />;

  return (
    <div className={styles.container}>
      <h2>Kindly choose a wallet to proceed with your payment.</h2>

      <div className={styles.wallet}>
        {wallets.map((item) => (
          <Link
            to={`${item.uniqueString}`}
            className={styles.crypto}
            key={item.uniqueString}
          >
            <img src={item.image} alt="" />
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>

      <div>
        <h3>Wallet Not listed? Click here to generate wallet Address</h3>

        <Button
          onClick={() =>
            navigate("/dashboard/wallet/fund/cryptowallet/3432006904")
          }
          variations={"primary"}
          sizes={"large"}
        >
          Generate Wallet Address
        </Button>
      </div>
    </div>
  );
}

export default CryptoWallet;
