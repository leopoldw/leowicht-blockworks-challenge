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

interface DataPoint {
  x: number;
  y: number;
}

interface DataSet {
  label: string;
  data: DataPoint[];
}

interface LineChartType {
  datasets: DataSet[];
}

const LineChart = ({ datasets }: LineChartType) => {
  return (
    <Line
      data={{ datasets }}
      options={{
        parsing: false,
        animations: {
          tension: {
            duration: 250,
            easing: "easeOutQuad",
          },
        },
        responsive: true,
        plugins: {
          autocolors: {
            enabled: true,
          },
          // intelligently reduce the number
          // of points on screen for performance
          decimation: {
            enabled: true,
            algorithm: "lttb",
            samples: 250, // 1 point per 4 pixels (1000px / 4)
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
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              displayFormats: {
                day: "d MMM yyyy",
              },
              tooltipFormat: "d MMM yyyy",
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
