import type { Item } from "../types";

const traverseData = (
  items: Item[],
  depth: number,
  phrase: string,
  path: string[] = [],
  results: Record<string, number> = {}
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
      traverseData(children, depth, phrase, currentPath, results);
    }
  }

  return results;
};

export default traverseData;
