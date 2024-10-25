import loadJsonData from "../utils/loadJsonData";
import traverseData from "../utils/traverseData";

const analyze = (args: string[]): void => {
  const startTime = Date.now();
  let depth = 1;
  let verbose = false;
  let phrase: string = "";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--depth":
        if (i + 1 < args.length) {
          const depthValue = args[++i];
          depth = parseInt(depthValue, 10);

          if (isNaN(depth)) {
            console.error("Invalid --depth value.");
            return;
          }
        }
        break;
      case "--verbose":
        verbose = true;
        break;
      default:
        phrase = arg;
        break;
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
