import { readFileSync } from "fs";
import path from "path";
import type { Data } from "../types";

const loadJsonData = (filepath: string): Data | void => {
  try {
    const filePath = path.resolve(filepath);
    const jsonData = readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error: any) {}
};

export default loadJsonData;
