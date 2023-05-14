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
  canShow : Boolean;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getItem();
    this.checkBuyStatus();
  }

  checkBuyStatus() : void {

    let user: User = this.authService.getUser();

     
    this.userService.getUser(user._id).subscribe(userObj => {
      
      const json = JSON.stringify(userObj.items);
      const obj = JSON.parse(json);
      const mapNew = new Map(Object.entries(obj));

      if(mapNew.has(this.item._id)){
        this.canShow = false;
      } else{
        this.canShow = true && this.authService.isLoggedIn();
      }
    
    });

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

  goBack(): void {
    this.location.back();
  }
}
