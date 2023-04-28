import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

  items: Item[] = [];

  constructor(private itemService: ItemService){}

  ngOnInit(): void {
      this.itemService.getItems().subscribe(items => this.items = items);
  }

}
