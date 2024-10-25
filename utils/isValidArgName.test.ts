import isValidArgName from "./isValidArgName";

describe("isValidArgName", () => {
  const validArgs = ["depth"];

  test("should return true for valid argument with single hyphen", () => {
    expect(isValidArgName("-depth", validArgs)).toBe(true);
  });

  test("should return true for valid argument with double hyphen", () => {
    expect(isValidArgName("--depth", validArgs)).toBe(true);
  });

  test("should return true for valid argument with en-dash", () => {
    expect(isValidArgName("–depth", validArgs)).toBe(true);
  });

  test("should return false for invalid argument format", () => {
    expect(isValidArgName("---depth", validArgs)).toBe(false);
    expect(isValidArgName("--invalid", validArgs)).toBe(false);
    expect(isValidArgName("-other", validArgs)).toBe(false);
    expect(isValidArgName("–random", validArgs)).toBe(false);
  });

  test("should return false if the argument name is not in validArgs", () => {
    expect(isValidArgName("--notValid", validArgs)).toBe(false);
  });
});
