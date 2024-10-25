import loadJsonData from "../utils/loadJsonData";
import traverseData from "../utils/traverseData";
import isValidArgName from "../utils/isValidArgName";
import trimLines from "../utils/trimLines";

const usageGuide = trimLines(`
  ${"-depth".padEnd(10)} integer
  ${"-verbose".padEnd(10)} optional
  ${'"phrase"'.padEnd(10)} string

  example:
  bun run cli.ts analyze -depth 2 -verbose "phrase"
`);

const analyze = (args: string[]): void => {
  const startTime = Date.now();
  const validArgs = ["depth", "verbose"];

  let depth: number | undefined;
  let verbose = false;
  let phrase: string = "";

  for (const [index, arg] of args.entries()) {
    if (!isValidArgName(arg, validArgs)) {
      // current argument is not valid
      if (
        isValidArgName(
          args[index - 1],
          validArgs.filter((arg) => !["verbose"].includes(arg))
        )
      ) {
        // this argument is a value for a previous valid argument
        continue;
      }
      phrase = arg;
    }

    if (arg.endsWith("verbose")) {
      verbose = true;
    }

    if (arg.endsWith("depth")) {
      const depthValue = args[index + 1];
      depth = parseInt(depthValue, 10);

      if (isNaN(depth)) {
        console.error("Argument -depth is not a valid integer number.");
        console.log(usageGuide);
        return;
      }
    }
  }

  if (depth === undefined) {
    console.error("Argument -depth is required.");
    console.log(usageGuide);
    return;
  }

  if (depth < 1) {
    console.error("Argument -depth should not be less than 1.");
    console.log(usageGuide);
    return;
  }

  if (!phrase) {
    console.error("Phrase is required.");
    console.log(usageGuide);
    return;
  }

  const paramsTime = Date.now() - startTime;
  const resultStartTime = Date.now();

  const data = loadJsonData("./dicts/data.json")?.data || [];

  const results = traverseData(data, depth, phrase);

  const resultTime = Date.now() - resultStartTime;

  if (Object.keys(results).length === 0) {
    console.log("\n0\n");
  } else {
    const readableResults = Object.entries(results)
      .map(([value, total]) => `${value} = ${total};`)
      .join("\n");

    console.log(
      trimLines(`
        ${readableResults}
      `)
    );
  }

  if (verbose) {
    console.log(
      trimLines(`
      ${"Tempo de carregamento dos parâmetros".padEnd(40) + paramsTime}ms
      ${"Tempo de verificação da frase".padEnd(40) + resultTime}ms
      `)
    );
  }
};

export default analyze;
