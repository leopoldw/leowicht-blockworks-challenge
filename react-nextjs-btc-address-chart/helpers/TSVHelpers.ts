import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

const sanitize = (csv: string) => {
  const allRows = csv
    // BOM markers (start of file bytes) not stripped for some reason...
    // may be a node version thing
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

export const parse = async (filePath: string) => {
  const result = await readFile(filePath, "utf-8");
  const sanitizedResult = sanitize(result);
  return sanitizedResult;
};
