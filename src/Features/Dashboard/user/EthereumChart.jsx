import styles from "../../../modules/EthereumChart.module.css";
import { FaEthereum } from "react-icons/fa";
import Filter from "../../../ui/Filter";
import Chart from "./Chart";
import useEthereumChart from "./useEthereumChart";
import { useSearchParams } from "react-router-dom";
import { eachDayOfInterval, format, subDays, subHours } from "date-fns";
import { formatCurrency } from "../../../utils/helpers";

function EthereumChart() {
  const [searchParams] = useSearchParams();

  const days = searchParams.get("days") || 7;
  const { data, isLoading, currentEthPrice, isError, error } =
    useEthereumChart(days);

  const filterOptions = [
    { value: "1", label: "Last 24H" },
    { value: "7", label: "Last 7D" },
    { value: "30", label: "Last Month" },
  ];

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), days),
    end: new Date(),
  });

  function getLast24Hours() {
    const now = new Date();
    const hours = Array.from({ length: 24 }, (_, i) => subHours(now, 23 - i));
    return hours;
  }

  if (isLoading) return <p>Loading Ethereum Data...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.DashboardBox}>
      <div className={styles.info}>
        <div>
          <h2>
            Price of Ethereum <FaEthereum /> {formatCurrency(currentEthPrice)}
          </h2>
          <span>
            {format(allDates.at(0), "MM dd yyyy")}&mdash;
            {format(allDates.at(-1), "MM dd yyyy")}
          </span>
        </div>

        <Filter filterField={"days"} options={filterOptions} />
      </div>

      <Chart
        days={days}
        data={data}
        allDates={days > 2 ? allDates : getLast24Hours()}
      />
    </div>
  );
}

export default EthereumChart;
