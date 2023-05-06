import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Map<string, number> = new Map<string, number>();
  userId: string;

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUser()._id;
    this.userService.getUserCart(this.userId).subscribe((cart) => {
      this.cart = this.convertMapValuesToNumber(cart);
    });
  }

  incrementQuantity(itemId: string): void {
    this.userService.incrementItemQuantity(this.userId, itemId).subscribe(result => {
      if(result) {
        alert("Item quantity incremented.");
      }
      else {
        alert("Couldn't increment quantity.");
      }
    });
  }

  decrementQuantity(itemId: string): void {
    this.userService.decrementItemQuantity(this.userId, itemId).subscribe(result => {
      if(result) {
        alert("Item quantity decremented.");
      }
      else {
        alert("Couldn't decrement quantity.");
      }
    });
  }

  removeFromCart(itemId: string): void {
    this.userService.removeItemFromCart(this.userId, itemId).subscribe(result => {
      if(result) {
        alert("Item removed from cart.");
      }
      else {
        alert("Couldn't remove item from cart.");
      }
    });
  }

  clearCart(): void {
    this.userService.clearCart(this.userId).subscribe(result => {
      if(result) {
        alert("Cart cleared.");
      }
      else {
        alert("Couldn't clear cart");
      }
    });
  }

  cartTotal(): number {
    let total = 0;
    this.cart.forEach((quantity, itemId) => {
      this.itemService.getItemPrice(itemId).subscribe(price => {
        total += price * quantity;
      });
    });
    return total;
  }

  convertMapValuesToNumber(map: Map<string, string>): Map<string, number> {
    const result = new Map<string, number>();
    for (const [key, value] of map.entries()) {
      result.set(key, Number(value));
    }
    return result;
  }
}
