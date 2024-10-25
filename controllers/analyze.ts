import loadJsonData from "../utils/loadJsonData";
import traverseData from "../utils/traverseData";
import isValidArgName from "../utils/isValidArgName";

const analyze = (args: string[]): void => {
  const startTime = Date.now();
  const validArgs = ["depth", "verbose"];

  let depth = 1;
  let verbose = false;
  let phrase: string = "";

  for (const [index, arg] of args.entries()) {
    if (!isValidArgName(arg, validArgs)) {
      phrase = arg;
      continue;
    }

    if (arg.endsWith("verbose")) {
      verbose = true;
    }

    if (arg.endsWith("depth")) {
      if (index + 1 === args.length) {
        continue;
      }
      const depthValue = args[index + 1];
      depth = parseInt(depthValue, 10);

      if (isNaN(depth)) {
        console.error("Invalid --depth value.");
        continue;
      }
    }
  }

  if (depth < 1) {
    console.error("Argument --depth should not be less than 1.");
    return;
  }

  if (!phrase) {
    console.error("Phrase is required.");
    return;
  }

  const paramsTime = Date.now() - startTime;
  const resultStartTime = Date.now();

  const data = loadJsonData("./dicts/data.json")?.data || [];

  const results = traverseData(data, depth, phrase);

  const resultTime = Date.now() - resultStartTime;

  console.log("");

  if (Object.keys(results).length === 0) {
    console.log("0");
  } else {
    for (const [key, value] of Object.entries(results)) {
      console.log(`${key} = ${value}; `);
    }
  }

  if (verbose) {
    console.log("\n\r");
    console.log(
      `Tempo de carregamento dos parâmetros`.padEnd(40) + `${paramsTime}ms`
    );
    console.log(`Tempo de verificação da frase`.padEnd(40) + `${resultTime}ms`);
  }

  console.log("\n\r");
};

export default analyze;
