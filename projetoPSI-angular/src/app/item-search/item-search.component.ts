import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import { Observable } from 'rxjs';
import { Item } from '../item';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent {
  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) { }

  search(event: any): void {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      this.items$ = this.itemService.searchItems(searchTerm);
    } else {
      this.items$ = null;
    }
  }
}