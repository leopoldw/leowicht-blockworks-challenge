import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  Decimation,
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
  autocolors,
  Tooltip,
  Legend,
  Decimation
);

interface DataSet {
  label: string;
  data: number[]
}

interface LineChartType {
  data: {
    labels: string[],
    datasets: DataSet[],
  }
}

const LineChart = ({ data }: LineChartType) => {
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
            display: true,
            position: "top",
            labels: {
              padding: 40,
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              title: (context) => {
                return context[0].label.replace(", 12:00:00 a.m.", "");
              },
            },
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              displayFormats: {
                day: "d MMM yyyy",
              },
            },
            ticks: {
              maxRotation: 0,
              autoSkip: true,
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
