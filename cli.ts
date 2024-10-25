import analyze from "./controllers/analyze";
import trimLines from "./utils/trimLines";

const VALID_ACTIONS = ["analyze"];

function app(): void {
  const args = process.argv.slice(2);

  if (args.length === 0 || !VALID_ACTIONS.includes(args[0])) {
    const usageGuide = trimLines(`
      "${args[0]}" is not a valid CLI action.

      Available actions:
        - ${VALID_ACTIONS.join("\n - ")}
    `);

    console.log(usageGuide);
    return;
  }

  const action = args[0];
  const actionArgs = args.slice(1);

  if (action === "analyze") {
    analyze(actionArgs);
  }
}

app();
