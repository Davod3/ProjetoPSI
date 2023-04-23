import { Injectable } from '@angular/core';
import { User } from './user';
import { UserToken } from './token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {ResponseToken} from './responseToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;
  private url: string = 'http://localhost:3000';

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
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }

  }

  public register(userToken: UserToken): Observable<ResponseToken> {
    return this.http.post<ResponseToken>(`${this.url}/authenticate`, userToken, this.httpOptions)
    .pipe(tap((response: ResponseToken) => {

      if(response.token){
        this.saveToken(response.token);
      }

      return response;

    }));
  }
}
