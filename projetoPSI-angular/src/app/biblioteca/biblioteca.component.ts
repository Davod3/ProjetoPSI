import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

  library: Map<Item, string> = new Map<Item, string>();
  items: [Item, string][] = [];
  ascendingOrder = true;
  dateAscendingOrder = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.buildPage();
  }

  private buildPage(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserLibrary(id).subscribe(library => {
      this.library = library;
      this.items = Array.from(library.entries());
      this.sortItems(); // Sort the items after retrieving the library data; by default ascending name order was chosen
    });
  }

  toggleSortOrder(): void {
    this.ascendingOrder = !this.ascendingOrder;
    this.sortItems();
  }

  toggleDateSortOrder(): void {
    this.dateAscendingOrder = !this.dateAscendingOrder;
    this.sortItemsByDate();
  }

  sortItems(): void {
    this.items.sort((a, b) => {
      const nameA = a[0].name.toLowerCase();
      const nameB = b[0].name.toLowerCase();
      if (this.ascendingOrder) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  sortItemsByDate(): void {
    this.items.sort((a, b) => {
      const dateA = new Date(a[1]);
      const dateB = new Date(b[1]);
      if (this.dateAscendingOrder) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }
  
  goBack(): void {
    this.location.back();
  }
}
