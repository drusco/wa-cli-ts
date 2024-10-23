import { readFileSync } from "fs";
import path from "path";

interface Item {
  name: string;
  items?: Item[];
}

interface Data {
  data: Item[];
}

const VALID_ACTIONS = ["analyze"];

function loadData(): Data {
  const filePath = path.resolve("dicts/data.json");
  const jsonData = readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

async function app(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || !VALID_ACTIONS.includes(args[0])) {
    console.log(
      'usage:\n\r\tanalyze --depth <n> --verbose (optional) "{phrase}"'
    );
    return;
  }

  const action = args[0];
  const actionArgs = args.slice(1);

  if (action === "analyze") {
    await analyze(actionArgs);
  }
}

async function analyze(args: string[]): Promise<void> {
  console.log(args);
}

app();
