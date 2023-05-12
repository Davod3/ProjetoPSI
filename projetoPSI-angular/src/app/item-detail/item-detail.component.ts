import { Component, Input } from '@angular/core';
import { Item } from '../item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemService } from '../item.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { UserService } from '../user.service';

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
    private location: Location,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  checkBuyStatus() : boolean {

    let user: User = this.authService.getUser();


    //Check if user has item in library, depends on completed library


    return true;

  }

  getItem(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id)
      .subscribe(item => {
        this.item = item
      });
    
  }

  addToCart(): void {
    
    let user: User = this.authService.getUser();

    this.userService.addItemToCart(this.item._id, user._id).subscribe(result => {

      if(result) {

        alert("Item added to cart!");

      } else {

        alert("Failed to add item to cart. Try again later!");

      }

    });


  }

  canShow(): boolean{
    return this.authService.isLoggedIn() && this.checkBuyStatus();
  } 

  goBack(): void {
    this.location.back();
  }
}
