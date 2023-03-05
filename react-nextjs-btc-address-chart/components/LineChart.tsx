import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";
import autocolors from "chartjs-plugin-autocolors";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  autocolors
);

const LineChart = ({ data }) => {
  return (
    <Line
      data={data}
      options={{
        animations: {
          tension: {
            duration: 500,
            easing: "linear",
            from: 1,
            to: 0,
          },
        },
        responsive: true,
        plugins: {
          autocolors: {
            enabled: true,
          },
          legend: {
            position: "top",
          },
          decimation: {
            enabled: true,
            algorithm: 'lttb',
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "year",
            },
            adapters: {
              date: {
                locale: enUS,
              },
            },
          },
          y: {
            type: "linear",
            grace: "5%",
            beginAtZero: true,
            suggestedMax: 10000000,
            ticks: {
              format: { notation: "compact" },
            },
          },
        },
      }}
    />
  );
};

export default LineChart;
