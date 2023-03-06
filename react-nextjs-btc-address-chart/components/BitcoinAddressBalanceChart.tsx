import LineChart from "./LineChart";
import RadioSelector from "./RadioSelector";
import { useState } from "react";
import sub from "date-fns/sub";
import isBefore from "date-fns/isBefore";
import startOfYear from "date-fns/startOfYear";
import { LTTB } from "downsample";
import { BTCBalances } from '../pages/api/btc-addresses'

const HEADER_LEGEND_MAP = {
  Time: "Time",
  ">1k": "BTC / Addr Cnt of Bal e $1K",
  ">10k": "BTC / Val in Addrs w/ Bal e $10K USD",
  ">100k": "BTC / Val in Addrs w/ Bal e $100K USD",
  ">1m": "BTC / Val in Addrs w/ Bal e $1M USD",
  ">10m": "BTC / Val in Addrs w/ Bal e $10M USD",
};

const FORMAT_ORDER = [">1k", ">10k", ">100k", ">1m", ">10m"] as const;
type FORMAT_ORDER_TYPE = typeof FORMAT_ORDER[number]

const FILTER_VALUES = ["All", "1M", "3M", "12M", "YTD"] as const;
type FILTER_VALUE_TYPE = typeof FILTER_VALUES[number]

const formatBodyForChart = ({ header, body }: BTCBalances) => {
  // const data = LTTB(body, 800)
  const data = body;
  console.log("leo", body.length, data.length, body);

  const timeIndex = header.indexOf(HEADER_LEGEND_MAP["Time"]);

  const labels = data.map((row) => row[timeIndex]);

  const datasets = FORMAT_ORDER.map((label: FORMAT_ORDER_TYPE) => {
    const columnIndex = header.indexOf(HEADER_LEGEND_MAP[label]);
    return {
      label,
      data: data.map((row) => Number(row[columnIndex])),
    };
  });

  return {
    labels,
    datasets,
  };
};

interface FilterBody {
  header: BTCBalances['header'],
  body: BTCBalances['body'],
  filter: FILTER_VALUE_TYPE,
}

const filterBody = ({ header, body, filter }: FilterBody) => {
  const today = new Date();
  const timeIndex = header.indexOf(HEADER_LEGEND_MAP["Time"]);
  let cutoff: Date | undefined;

  switch (filter) {
    case "1M":
      cutoff = sub(today, { months: 1 });
      break;
    case "3M":
      cutoff = sub(today, { months: 1 });
      break;
    case "12M":
      cutoff = sub(today, { months: 12 });
      break;
    case "YTD":
      cutoff = startOfYear(today);
      break;
  }

  if (!cutoff) {
    return body;
  } else {
    return body.filter((row) => {
      return isBefore(cutoff as Date, new Date(row[timeIndex]));
    });
  }
};

const BitcoinAddressBalanceChart = ({ header, body }: BTCBalances) => {
  const [selectedScale, setSelectedScale] = useState<FILTER_VALUE_TYPE>(FILTER_VALUES[0]);

  const filteredBody = filterBody({ header, body, filter: selectedScale });

  const result = formatBodyForChart({ header, body: filteredBody });

  return (
    <div style={{ width: "1000px", height: "500px", margin: "0 auto" }}>
      {result.labels.length ? (
        <LineChart data={result} />
      ) : (
        <div className="min-h-full bg-slate-100 flex items-center">
          <div className=" w-full text-center text-2xl">
            No results for this time period :(
          </div>
        </div>
      )}
      <RadioSelector
        values={FILTER_VALUES}
        value={selectedScale}
        onChange={setSelectedScale}
      />
    </div>
  );
};

export default BitcoinAddressBalanceChart;
