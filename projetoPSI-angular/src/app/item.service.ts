import { Injectable } from '@angular/core';
import { Item } from './item';
import { ITEMS } from './mock-items';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getItem(id: number) : Observable<Item> {
    const item = ITEMS.find(i => i.id === id)!;
    return of(item);
  }

  constructor() { }

  getItems(): Observable<Item[]> {
    const items = of(ITEMS);
    return items;
  }
}
