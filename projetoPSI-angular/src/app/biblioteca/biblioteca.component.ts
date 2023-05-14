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
    });
  }

  toggleSortOrder(): void {
    this.ascendingOrder = !this.ascendingOrder;
    this.sortItems();
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

  goBack(): void {
    this.location.back();
  }
}
