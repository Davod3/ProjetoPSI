export interface User {
    _id: number;
    username: string;
    items: string[];
    followers: string[];
    following: string[];
    lists: string[];
    expires: number;
    image: string;
  }