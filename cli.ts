import { readFileSync } from "fs";
import path from "path";

interface Item {
  name: string;
  items?: Item[];
}

interface Data {
  data: Item[];
}

function loadData(): Data {
  const filePath = path.resolve("dicts/data.json");
  const jsonData = readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

console.log(loadData());
