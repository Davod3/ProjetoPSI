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

  constructor(

    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
    
    ){}

  ngOnInit(): void {
    
      this.buildPage();

  }

  private buildPage(): void {
    
    const id = String(this.route.snapshot.paramMap.get('id'));
  
    this.userService.getUserLibrary(id)
      .subscribe(library => {
          
        this.items = library;
  
        });
      
    }

    goBack(): void {
      this.location.back();
    }

}
