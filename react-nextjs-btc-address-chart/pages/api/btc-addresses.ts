import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import util from "util";

const readFile = util.promisify(fs.readFile);

interface SanitizeTSV {
  header: string[];
  body: string[][];
}

// not really a CSV, more "tab separated values"
const sanitizeTSV = (csv: string): SanitizeTSV => {
  const allRows = csv
    // BOM markers (start of file bytes)
    // not stripped for some reason... may be a node version thing
    .replace(/\�/g, "")
    // quotes (around date)
    .replace(/"/g, "")
    // null characters
    .replace(/\0/g, "")
    // split newlines into array items
    .split(/\n/g);

  // first item is header data
  const header = allRows[0].split(/\t/);

  // split row into column items (array of arrays)
  const body = allRows.slice(1).map((row) => row.split(/\t/));

  return {
    header,
    body,
  };
};

const parseTSV = async (filePath: string) => {
  const result = await readFile(filePath, "utf-8");
  const sanitizedResult = sanitizeTSV(result);
  return sanitizedResult;
};

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const CSVPath = path.resolve(
      process.cwd(),
      "data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv"
    );
    const result = await parseTSV(CSVPath);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send("An error has occurred");
  }
};
