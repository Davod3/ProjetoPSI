import { Component } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent {
  items : Item[] = [];
  selectedItem?: Item;

  constructor(private itemService: ItemService) {}

  getItems(): void {
    this.itemService.getItems()
        .subscribe(items => this.items = items);
  }

  ngOnInit(): void {
    this.getItems();
  }
}
