import { Injectable } from '@angular/core';
import { User } from './user';
import { UserToken } from './token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {ResponseToken} from './responseToken';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;
  private url: string = 'http://localhost:3057';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router)
    {};

  private saveToken(token: string): void {
    localStorage.setItem('user-token', token);
    this.token = token;
  }

  private getToken(): string {

    if(!this.token){
      this.token = localStorage.getItem('user-token');
    }

    return this.token;
  }

  public getUser(): User {
    const token = this.getToken();

    if(token){
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {

    const user = this.getUser();

    if(user) {
      return user.expires > Date.now() / 1000;
    } else {
      return false;
    }

  }

  public register(userToken: UserToken): Observable<ResponseToken> {
    return this.http.post<ResponseToken>(`${this.url}/register`, userToken, this.httpOptions)
    .pipe(tap((response: ResponseToken) => {

      if(response.token){
        this.saveToken(response.token);
      }

      return response;

    }), catchError(this.handleError<ResponseToken>(null)));
  }


  public login(userToken: UserToken): Observable<ResponseToken> {
    return this.http.post<ResponseToken>(`${this.url}/login`, userToken, this.httpOptions)
      .pipe(
        tap((response: ResponseToken) => {
          if (response.token) {
            this.saveToken(response.token);
          }
          return response;
        }),
        catchError((error) => {
          console.log('An error occurred:', error);
          return of(null);
        })
      );
 }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      //Return observable with default result
      return of(result as T);
    };
  }

  public setAuthToken(token: string): void {
    this.saveToken(token);
  }

  public logout(): void {

    this.token = '';
    window.localStorage.removeItem('user-token');
    this.router.navigateByUrl('/login');
  }

}
