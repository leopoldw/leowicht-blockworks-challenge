import { NextApiRequest, NextApiResponse } from "next";
import * as TSV from "../../helpers/TSVHelpers";
import path from "path";

export interface BTCBalances {
  header: string[];
  body: string[][];
}

// not really a CSV, more TSV "tab separated values"
export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const TSVPath = path.resolve(
      process.cwd(),
      "data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv"
    );
    const result: BTCBalances = await TSV.parse(TSVPath);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json("An error has occurred");
  }
};
