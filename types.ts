export interface Item {
  name: string;
  items?: Item[];
}

export interface Data {
  data: Item[];
}
