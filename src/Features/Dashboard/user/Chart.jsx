import { useEffect, useState } from "react";
import styles from "../../../modules/EthereumChart.module.css";
import { useDarkMode } from "../../../hooks/DarkModeContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, isSameDay } from "date-fns";

function Chart({ data, days, allDates }) {
  const { isDarkMode } = useDarkMode();
  const [chart, setChart] = useState([]);
  const [priceDomain, setPriceDomain] = useState([0, 0]);

  useEffect(() => {
    const newChart = allDates?.map((date) => {
      const priceOnDate = data
        ?.filter(([timestamp, _]) => isSameDay(new Date(timestamp), date))
        .map(([_, price]) => price)[0];

      return {
        date: format(date, "MM-dd"),
        price: Math.floor(priceOnDate) || 0,
      };
    });

    setChart(newChart);

    // Update min and max prices
    const priceValues = newChart.map((entry) => entry.price);
    const minPrice = Math.min(...priceValues);
    const maxPrice = Math.max(...priceValues);
    setPriceDomain([minPrice || 0, maxPrice || 0]);
  }, [days, allDates, data]);

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <ResponsiveContainer
      height={"100%"}
      width={"100%"}
      className={styles.container}
    >
      <AreaChart data={chart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={"date"}
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
          textAnchor="start"
        />
        <YAxis
          unit={"$"}
          mirror
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
          domain={[priceDomain[0].toFixed(0), priceDomain[1].toFixed(0)]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.background,
            color: colors.text,
          }}
        />
        <Area
          dataKey="price"
          type="monotone"
          stroke={colors.totalSales.stroke}
          fill={colors.totalSales.fill}
          strokeWidth={2}
          name="Price"
          unit={"$"}
          dot={{ r: 1 }}
          domain={[priceDomain[0].toFixed(0), priceDomain[1].toFixed(0)]}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
