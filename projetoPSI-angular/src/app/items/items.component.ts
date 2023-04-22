import { Component } from '@angular/core';
import { Item } from '../item';
import { ITEMS } from '../mock-items';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent {
  items = ITEMS;
  selectedItem?: Item;
  onSelect(item: Item): void {
    this.selectedItem = item;
  }
}
