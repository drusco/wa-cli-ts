import { readFileSync } from "fs";
import path from "path";
import type { Data } from "../types";

const loadData = (filepath: string): Data => {
  const filePath = path.resolve(filepath);
  const jsonData = readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

export default loadData;
