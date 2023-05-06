import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { List } from './list';
import { Item } from './item';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url = 'http://localhost:3057';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private itemService: ItemService) { }

  getUser(_id: string): Observable<User> {
    const url = `${this.url}/user/${_id}`;
    return this.http.get<User[]>(url).pipe(
      map(users => users[0]), // Return only the first element of the array
      catchError(this.handleError<User>(null))
    );
  }

  getUserLists(id: string): Observable<List[]> {
    const url = `${this.url}/user/lists/${id}`;
    return this.http.get<List[]>(url).pipe(
      tap((response: List[]) => {
        return response;
      }), catchError(this.handleError<List[]>(null))
    );
  }

  getUserFollowing(id: string): Observable<User[]> {
    const url = `${this.url}/user/following/${id}`;
    return this.http.get<User[]>(url).pipe(
      tap((response: User[]) => {
        return response;
      }), catchError(this.handleError<User[]>(null))
    );
  }

  getUserFollowers(id: string): Observable<User[]> {
    const url = `${this.url}/user/followers/${id}`;
    return this.http.get<User[]>(url).pipe(
      tap((response: User[]) => {
        return response;
      }), catchError(this.handleError<User[]>(null))
    );
  }

  getUserLibrary(id: string): Observable<Item[]> {
    const url = `${this.url}/user/library/${id}`;
    return this.http.get<Item[]>(url).pipe(
      tap((response: Item[]) => {
        return response;
      }), catchError(this.handleError<Item[]>(null))
    );
  }

  addItemToCart(itemid: string, userid: string): Observable<any> {
    return this.http.put(`${this.url}/user/cart/add`, {"itemid" : `${itemid}`, "userid" : `${userid}`}, this.httpOptions).pipe(
      tap((response) => {
        return response;
      }), catchError(this.handleError<any>('addItemToCart', false))
    );

  }

  clearCart(userId: string): Observable<any> {
    const url = `${this.url}/user/cart/clear`;
    const body = { userId: userId };
    return this.http.put<User>(url, body, this.httpOptions).pipe(
      catchError(this.handleError<User>('clearCart'))
    );
  }

  removeItemFromCart(userId: string, itemId: string): Observable<any> {
    const url = `${this.url}/user/cart/remove`;
    const body = { userId: userId, itemId: itemId };
    return this.http.put<User>(url, body, this.httpOptions).pipe(
      catchError(this.handleError<User>('removeItemFromCart'))
    );
  }

  incrementItemQuantity(userId: string, itemId: string): Observable<any> {
    const url = `${this.url}/user/cart/increment`;
    const body = { userId: userId, itemId: itemId };
    return this.http.put<User>(url, body, this.httpOptions).pipe(
      catchError(this.handleError<User>('incrementItemQuantity'))
    );
  }

  decrementItemQuantity(userId: string, itemId: string): Observable<any> {
    const url = `${this.url}/user/cart/decrement`;
    const body = { userId: userId, itemId: itemId };
    return this.http.put<User>(url, body, this.httpOptions).pipe(
      catchError(this.handleError<User>('decrementItemQuantity'))
    );
  }

  getUserCart(userId: string): Observable<Map<string, string>> {
    const url = `${this.url}/user/cart/${userId}`;
    return this.http.get<{[key: string]: string}>(url).pipe(
      map(response => {
        const cart = new Map<string, string>();
        for (const key in response) {
          cart.set(key, response[key]);
        }
        return cart;
      }),
      catchError(this.handleError<Map<string, string>>(null))
    );
  }

  getItemPrice(itemId: string): Observable<number> {
    return this.itemService.getItem(itemId).pipe(
      map(item => item.price),
      catchError(this.handleError<number>(null))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
