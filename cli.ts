import analyze from "./controllers/analyze";
import trimLines from "./utils/trimLines";

const VALID_ACTIONS = ["analyze"];

export const usageGuide = trimLines(`
  Available actions:
    - ${VALID_ACTIONS.join("\n - ")}
`);

function cli(): void {
  const args = process.argv.slice(2);

  if (args.length === 0 || !VALID_ACTIONS.includes(args[0])) {
    console.error(`"${args[0]}" is not a valid CLI action.`);
    console.log(usageGuide);
    return;
  }

  const action = args[0];
  const actionArgs = args.slice(1);

  if (action === "analyze") {
    analyze(actionArgs);
  }
}

if (require.main === module) {
  cli();
}

export default cli;
