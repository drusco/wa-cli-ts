import type { Item } from "../types";

const traverseDataRecursive = (
  items: Item[],
  path: string[],
  results: Record<string, number>,
  depth: number,
  phrase: string
): Record<string, number> => {
  const pathSize = path.length;
  const phraseLowercase = phrase.toLowerCase();

  for (const item of items) {
    const { name, items: children } = item;

    if (pathSize >= depth && phraseLowercase.includes(name.toLowerCase())) {
      const pathName = path[depth - 1];
      if (pathName) {
        results[pathName] = (results[pathName] || 0) + 1;
      }
    }

    if (children && children.length > 0) {
      const currentPath = [...path, name];
      traverseDataRecursive(children, currentPath, results, depth, phrase);
    }
  }

  return results;
};

export default traverseDataRecursive;
