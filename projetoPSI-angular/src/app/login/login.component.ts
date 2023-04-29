import { Component } from '@angular/core';
import { UserToken } from '../token'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    username: '',
    password: '',
    isValid: true
  };
  error = '';

  constructor(
    private authenticator: AuthenticationService,
    private router: Router
  ){

  };

  login() {

  }

}
