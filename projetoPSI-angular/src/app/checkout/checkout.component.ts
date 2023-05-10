import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  items: Map<Item, String> = new Map<Item, String>();
  userId: string;
  nif: string;
  isValid: boolean = true;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthenticationService,
              private itemService: ItemService
              ) {};

  ngOnInit(): void {
    this.userId = this.authService.getUser()._id;
    this.userService.getUserCart(this.userId).subscribe((cart) => {
      console.log(cart);
    });
  }

  checkout() {
    const validNif = new RegExp(/^\d{9}$/g);
    if (validNif.test(this.nif)) {
      this.isValid = true;
      this.userService.checkout(this.userId).subscribe((response) => {
        if (response) {
          alert("Thank you for your purchase! Your order has been successfully processed.");
          this.router.navigate(['/dashboard']);
        } else {
          alert("Failed to process order. Please try again soon");
        }
      });
    } else {
      this.isValid = false;
    }
  };
}
