import type { Item } from "../types";
import traverseDataRecursive from "./traverseDataRecursive";

const traverseData = (
  items: Item[],
  depth: number,
  phrase: string
): Record<string, number> => {
  const path: string[] = [];
  const results: Record<string, number> = {};

  return traverseDataRecursive(items, path, results, depth, phrase);
};

export default traverseData;
