import { Item } from "./item";

export interface List {
    _id: number;
    name: string;
    content: Item[];
  }