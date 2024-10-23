const VALID_ACTIONS = ["analyze"];

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
