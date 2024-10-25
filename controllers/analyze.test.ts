import analyze from "../controllers/analyze";
import loadJsonData from "../utils/loadJsonData";

jest.mock("../utils/loadJsonData");

describe("analyze", () => {
  const usageGuide = 'bun run cli.ts analyze -depth 2 -verbose "phrase"';
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should display usage guide when -depth argument is missing", () => {
    analyze(["-verbose", "phrase"]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Argument -depth is required."
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(usageGuide)
    );
  });

  test("should display usage guide when -depth argument is invalid", () => {
    analyze(["-depth", "invalid", "phrase"]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Argument -depth is not a valid integer number."
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(usageGuide)
    );
  });

  test("should display usage guide when phrase is missing", () => {
    analyze(["-depth", "2", "-verbose"]);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Phrase is required.");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(usageGuide)
    );
  });

  test("should display usage guide when -depth is less than 1", () => {
    analyze(["-depth", "0", "phrase"]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Argument -depth should not be less than 1."
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(usageGuide)
    );
  });

  test("should call loadJsonData with correct parameters", () => {
    const mockData = [{ name: "animais" }];
    (loadJsonData as jest.Mock).mockReturnValue({ data: mockData });

    analyze(["-depth", "2", "phrase"]);

    expect(loadJsonData).toHaveBeenCalledWith("./dicts/data.json");
  });

  test("should print results from traverseData", () => {
    const mockData = [{ name: "animais", items: [{ name: "carnivoros" }] }];
    (loadJsonData as jest.Mock).mockReturnValue({ data: mockData });

    analyze(["-depth", "1", "carnivoros"]);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("animais = 1;")
    );
  });

  test("should print '0' when traverseData returns an empty result", () => {
    const mockData = [{ name: "animais", items: [{ name: "carnivoros" }] }];
    (loadJsonData as jest.Mock).mockReturnValue({ data: mockData });

    analyze(["-depth", "2", "phrase"]);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("\n0\n")
    );
  });

  test("should print verbose timing information when -verbose flag is used", () => {
    const startTimeMock = Date.now();

    jest
      .spyOn(Date, "now")
      .mockImplementationOnce(() => startTimeMock)
      .mockImplementationOnce(() => startTimeMock + 5)
      .mockImplementationOnce(() => startTimeMock)
      .mockImplementationOnce(() => startTimeMock + 10);

    analyze(["-depth", "2", "-verbose", "phrase"]);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Tempo de carregamento dos parâmetros".padEnd(40) + "5ms"
      )
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Tempo de verificação da frase".padEnd(40) + "10ms"
      )
    );
  });

  test("should use an empty array and print 0 when loadJsonData returns undefined", () => {
    (loadJsonData as jest.Mock).mockReturnValueOnce({ data: undefined });

    console.log = jest.fn();

    analyze(["-depth", "2", "-verbose", "phrase"]);

    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("\n0\n"));
  });

  test("handles large phrase correctly", () => {
    const mockData = [{ name: "parent", items: [{ name: "child" }] }];
    const phrase = "a".repeat(5000) + " child";

    (loadJsonData as jest.Mock).mockReturnValueOnce({ data: mockData });

    analyze(["-depth", "1", phrase]);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("parent = 1;")
    );
  });
});
