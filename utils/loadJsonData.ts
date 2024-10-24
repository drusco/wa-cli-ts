import { readFileSync } from "fs";
import path from "path";

const loadJsonData = (filepath: string): Record<string, unknown> | void => {
  try {
    const filePath = path.resolve(filepath);
    const jsonData = readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error: any) {}
};

export default loadJsonData;
