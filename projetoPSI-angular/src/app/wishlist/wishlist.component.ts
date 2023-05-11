import { Component } from '@angular/core';
import { Item } from '../item';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishlist: Item[] = [];

  constructor(

    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,

    ){}

  

    ngOnInit(): void {

      const id = String(this.route.snapshot.paramMap.get('id'));

      this.userService.getUserWishlist(id).subscribe(wishlist => {

        this.wishlist = wishlist;

      });

  }

  goBack(): void {
    this.location.back();
  }

}
