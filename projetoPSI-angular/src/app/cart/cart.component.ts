import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cart: Map<Item, number> = new Map<Item, number>();
  userId: string;

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUser()._id;
    this.userService.getUserCart(this.userId).subscribe((cart) => {
      console.log(cart);
      this.cart = this.convertMapValuesToNumber(cart);
    });
  }

  incrementQuantity(item: Item): void {
    this.userService.incrementItemQuantity(this.userId, item._id).subscribe(result => {
      if(result) {
        
        let oldQuantity = this.cart.get(item);

        this.cart.set(item, oldQuantity+1);
        

      }
      else {
        alert("Couldn't increment quantity.");
      }
    });
  }

  decrementQuantity(item: Item): void {

    let oldQuantity = this.cart.get(item);

    if(oldQuantity > 1) {

      this.userService.decrementItemQuantity(this.userId, item._id).subscribe(result => {
        if(result) {
        
          this.cart.set(item, oldQuantity-1);
  
        }
        else {
          alert("Couldn't decrement quantity.");
        }
      });

    } else {
      alert("Couldn't decrement quantity.")
    }

  }

  removeFromCart(item: Item): void {
    this.userService.removeItemFromCart(this.userId, item._id).subscribe(result => {
      if(result) {
        alert("Item removed from cart.");
        this.cart.delete(item);
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

        this.cart.clear();

      }
      else {
        alert("Couldn't clear cart");
      }
    });
  }

  cartTotal(): number {
    let total = 0;
    
    
    let entries = this.cart.entries();

    for(let entry of entries) {

      let item = entry[0];
      let amount = entry[1];

      total+= item.price * amount;

    }
    
    return total;
  }

  convertMapValuesToNumber(map: Map<string, string>): Map<Item, number> {
    const result = new Map<Item, number>();
    const json = JSON.stringify(map);
    const obj = JSON.parse(json);
    const mapNew = new Map(Object.entries(obj));

    for (const [key, value] of mapNew.entries()) {

      this.itemService.getItem(key).subscribe(item => {

        result.set(item, Number(value));
      })

    }
    return result;
  }
}
