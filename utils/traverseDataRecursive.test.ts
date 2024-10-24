import traverseDataRecursive from "./traverseDataRecursive";
import type { Item } from "../types";

describe("traverseDataRecursive", () => {
  const mockData: Item[] = [
    {
      name: "Animais",
      items: [
        {
          name: "Mamíferos",
          items: [
            {
              name: "Carnívoros",
              items: [
                {
                  name: "Felinos",
                  items: [
                    {
                      name: "Leões",
                    },
                    {
                      name: "Tigres",
                    },
                    {
                      name: "Jaguars",
                    },
                    {
                      name: "Leopardos",
                    },
                  ],
                },
              ],
            },
            {
              name: "Herbívoros",
              items: [
                {
                  name: "Equídeos",
                  items: [
                    {
                      name: "Cavalos",
                    },
                    {
                      name: "Zebras",
                    },
                    {
                      name: "Asnos",
                    },
                  ],
                },
              ],
            },
            {
              name: "Bovídeos",
              items: [
                {
                  name: "Bois",
                },
                {
                  name: "Búfalos",
                },
                {
                  name: "Antílopes",
                },
                {
                  name: "Cabras",
                },
              ],
            },
            {
              name: "Primatas",
              items: [
                {
                  name: "Gorilas",
                },
                {
                  name: "Chimpanzés",
                },
                {
                  name: "Orangotangos",
                },
              ],
            },
          ],
        },
        {
          name: "Aves",
          items: [
            {
              name: "1.2.1 Rapinas",
              items: [
                {
                  name: "Águias",
                },
                {
                  name: "Falcões",
                },
                {
                  name: "Corujas",
                },
                {
                  name: "Milhafres",
                },
              ],
            },
            {
              name: "Pássaros",
              items: [
                {
                  name: "Canários",
                },
                {
                  name: "Papagaios",
                },
                {
                  name: "Pardais",
                },
                {
                  name: "Rouxinóis",
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
    const results = traverseDataRecursive(mockData, [], {}, depth, phrase);

    expect(results).toEqual({
      Aves: 1,
    });
  });

  test("should not match items beyond the given depth", () => {
    const phrase = "Eu tenho preferência por animais carnívoros";
    const depth = 5;
    const results = traverseDataRecursive(mockData, [], {}, depth, phrase);

    expect(results).toEqual({});
  });

  test("should correctly traverse nested items and count matches", () => {
    const phrase = "Eu vi gorilas e papagaios";
    const depth = 3;
    const results = traverseDataRecursive(mockData, [], {}, depth, phrase);

    expect(results).toEqual({
      Pássaros: 1,
      Primatas: 1,
    });
  });

  test("should match case-insensitive phrases", () => {
    const phrase = "Eu vi PAPAGAIOS";
    const depth = 3;
    const results = traverseDataRecursive(mockData, [], {}, depth, phrase);

    expect(results).toEqual({
      Pássaros: 1,
    });
  });
});
