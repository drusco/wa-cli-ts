const trimLines = (text: string): string => {
  return text
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
};

export default trimLines;
