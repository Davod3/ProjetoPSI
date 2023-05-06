import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { List } from './list';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  error: any;

  private url = 'http://localhost:3057';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUser(_id: string): Observable<User> {
    const url = `${this.url}/user/${_id}`;
    return this.http.get<User[]>(url).pipe(
      map(users => users[0]) // Return only the first element of the array
    );
  }

  getUserByName(username: string): Observable<User> {
    const url = `${this.url}/user/username/${username}`;
    return this.http.get<User[]>(url).pipe(
      map(users => users[0]) // Return only the first element of the array
    );
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.url}/user/edit/${user._id}`;
    return this.http.post(url, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
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

  addUserToFollowingList(userId: string, followingUserId: string): Observable<User> {
    const url = `${this.url}/user/following/${userId}`;
    return this.http.put<User>(url, {followingUserId}).pipe(
      catchError(this.handleError<User>())
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
