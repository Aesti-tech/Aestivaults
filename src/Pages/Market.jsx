import useMarketData from "../Features/market/useMarketData";
import SpinnerFullPage from "../ui/SpinnerFullPage";
import styles from "../modules/Market.module.css";

import TrendingTable from "../Features/market/TrendingTable";
import RankedTable from "../Features/market/RankedTable";

function Market() {
  const { isLoadingrank, isLoadingtrends } = useMarketData();

  return (
    <div className={styles.market}>
      {isLoadingtrends ? <SpinnerFullPage /> : <TrendingTable />}
      {isLoadingrank ? <SpinnerFullPage /> : <RankedTable />}
    </div>
  );
}

export default Market;
