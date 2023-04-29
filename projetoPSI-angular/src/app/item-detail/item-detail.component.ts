import { Component, Input } from '@angular/core';
import { Item } from '../item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  @Input() item : Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log("ID " + id);
    this.itemService.getItem(id)
      .subscribe(item => {
        this.item = item
        console.log("item");
      });
    
  }

  goBack(): void {
    this.location.back();
  }
}
