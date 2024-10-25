import cli, { usageGuide } from "./cli";
import analyze from "./controllers/analyze";
import { jest } from "@jest/globals";

jest.mock("./controllers/analyze", () => jest.fn());

describe("CLI", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  test("should print usage guide and error for invalid action", () => {
    process.argv = ["bun", "cli.ts", "invalidAction"];

    cli();

    expect(console.error).toHaveBeenCalledWith(
      '"invalidAction" is not a valid CLI action.'
    );
    expect(console.log).toHaveBeenCalledWith(usageGuide);
  });

  test("should call analyze function for valid 'analyze' action", () => {
    process.argv = [
      "bun",
      "cli.ts",
      "analyze",
      "-depth",
      "2",
      "-verbose",
      "test phrase",
    ];

    cli();

    expect(analyze).toHaveBeenCalledWith([
      "-depth",
      "2",
      "-verbose",
      "test phrase",
    ]);
    expect(console.error).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalledWith(usageGuide);
  });
});
