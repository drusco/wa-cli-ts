import traverseData from "./traverseData";
import type { Item } from "../types";

describe("traverseData", () => {
  const mockData: Item[] = [
    {
      name: "Animais",
      items: [
        {
          name: "Mamíferos",
          items: [
            {
              name: "Primatas",
              items: [
                {
                  name: "Gorilas",
                },
                {
                  name: "Chimpanzés",
                },
              ],
            },
          ],
        },
        {
          name: "Aves",
          items: [
            {
              name: "Pássaros",
              items: [
                {
                  name: "Canários",
                },
                {
                  name: "Papagaios",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  test("should return results for matching items within the depth limit", () => {
    const phrase = "Eu amo papagaios";
    const depth = 2;
    const results = traverseData(mockData, depth, phrase);

    expect(results).toEqual({
      Aves: 1,
    });
  });

  test("should not match items beyond the given depth", () => {
    const phrase = "Eu tenho preferência por animais carnívoros";
    const depth = 5;
    const results = traverseData(mockData, depth, phrase);

    expect(results).toEqual({});
  });

  test("should correctly traverse nested items and count matches", () => {
    const phrase = "Eu vi gorilas e papagaios";
    const depth = 3;
    const results = traverseData(mockData, depth, phrase);

    expect(results).toEqual({
      Pássaros: 1,
      Primatas: 1,
    });
  });

  test("should match case-insensitive phrases", () => {
    const phrase = "Eu vi PAPAGAIOS";
    const depth = 3;
    const results = traverseData(mockData, depth, phrase);

    expect(results).toEqual({
      Pássaros: 1,
    });
  });

  test("handles large phrase correctly", () => {
    const mockData = [{ name: "parent", items: [{ name: "child" }] }];
    const phrase = "a".repeat(5000) + " child";

    const results = traverseData(mockData, 1, phrase);

    expect(results).toEqual({
      parent: 1,
    });
  });
});
