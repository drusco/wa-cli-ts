import { readFileSync } from "fs";
import path from "path";

const loadJsonData = (filepath: string): Record<string, unknown> | void => {
  try {
    const filePath = path.resolve(filepath);
    const jsonData = readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error: any) {
    if (error) {
      console.error(error.message, error.path);
    }
  }
};

export default loadJsonData;
