import { Injectable } from '@angular/core';
import { User } from './user';
import { Token } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

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
}
