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

  items: Item[] = [];
  ascendingOrder = true;

  constructor(

    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
    
    ){}

  ngOnInit(): void {
    
      this.buildPage();
      this.sortItems();

  }

  private buildPage(): void {
    
    const id = String(this.route.snapshot.paramMap.get('id'));
  
    this.userService.getUserLibrary(id)
      .subscribe(library => {
          
        this.items = library;
  
        });
      
    }

    toggleSortOrder(): void {

      this.ascendingOrder = !this.ascendingOrder;
      this.sortItems();

    }

    sortItems(): void {

      this.items.sort((a, b) => {

        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
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
