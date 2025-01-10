import { useEffect } from "react";
import { Chart } from "chart.js";

const data = {
  datasets: [
    {
      label: "Ethereum Price",
      data: [
        { t: "2023-01-01", o: 2500, h: 2700, l: 2400, c: 2600 }, // Open, High, Low, Close
        { t: "2023-01-02", o: 2600, h: 2800, l: 2500, c: 2700 },
        { t: "2023-01-03", o: 2700, h: 2900, l: 2600, c: 2800 },
        // More data points here...
      ],
    },
  ],
};

function ForexChart() {
  useEffect(() => {
    new Chart("myChart", {
      type: "financialLine", // This is the financial chart type
      data: data,
      options: {
        scales: {
          x: {
            type: "time", // Time scale for x-axis
          },
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value) {
                return "$" + value.toFixed(2);
              },
            },
          },
        },
      },
    });
  }, []);

  return <canvas id="myChart" width="400" height="200"></canvas>;
}

export default ForexChart;
