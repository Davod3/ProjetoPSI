export interface User {
    _id: string;
    username: string;
    items: Map<string, string>;
    followers: string[];
    following: string[];
    lists: string[];
    cart: Map<string, string>;
    expires: number;
    image: string;
    wishlist: string[];
  }