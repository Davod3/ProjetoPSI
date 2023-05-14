import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../list';
import { Location } from '@angular/common';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit{

  lists: List[] = [];

  constructor(

    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthenticationService
  
    ){}


  ngOnInit(): void {
    
    this.buildPage();

  }

  private buildPage(): void {
    
    const id = String(this.route.snapshot.paramMap.get('id'));
  
    this.userService.getUserLists(id)
      .subscribe(lists => {
          
        this.lists = lists;
  
        });
      
  }
  
  canShow(list: List): Boolean {

    let user = this.authService.getUser();

    return list.public || user._id === list.owner

  }

  goBack(): void {
    this.location.back();
  }

}
