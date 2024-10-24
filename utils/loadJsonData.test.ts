import { readFileSync } from "fs";
import path from "path";
import loadJsonData from "./loadJsonData";

jest.mock("fs");
jest.mock("path");

describe("loadJsonData utility", () => {
  const mockFilePath = "dicts/data.json";
  const mockResolvedPath = "/path/to/dicts/data.json";
  const mockJsonData = JSON.stringify({
    data: [{ name: "Animais", items: [{ name: "Mamíferos", items: [] }] }],
  });

  beforeEach(() => {
    jest.resetAllMocks();
    (path.resolve as jest.Mock).mockReturnValue(mockResolvedPath);
    (readFileSync as jest.Mock).mockReturnValue(mockJsonData);
  });

  test("should resolve the correct file path and read JSON data", async () => {
    const result = loadJsonData(mockFilePath);

    expect(path.resolve).toHaveBeenCalledWith(mockFilePath);
    expect(readFileSync).toHaveBeenCalledWith(mockResolvedPath, "utf-8");

    expect(result).toEqual(JSON.parse(mockJsonData));
  });

  test("should return undefined when loading the JSON data file fails", async () => {
    (readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("No such file or directory");
    });

    const result = loadJsonData(mockFilePath);

    expect(result).toBeUndefined();
  });
});
