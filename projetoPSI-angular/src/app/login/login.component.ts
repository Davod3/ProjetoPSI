import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserToken } from '../token'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credentials: UserToken = {
    username: '',
    password: '',
    isValid: true,
    err: []
  };

  constructor(
    private authenticator: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(): void {

    if(this.authenticator.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }

  }

  login() {

    this.credentials.err = [];
    this.credentials.isValid = true;

    if (this.credentials.username && this.credentials.password) {

      this.authenticator.login(this.credentials).subscribe((response) => {
        if (response) {

          console.log("User logged in!");
          this.authenticator.setAuthToken(response.token);
          this.router.navigateByUrl(`/dashboard`);

        } else {

          this.credentials.isValid = false;
          this.credentials.err.push("Invalid username or password");

        }
      });

    } else {

      this.credentials.isValid = false;
      this.credentials.err.push("Username and password are required");

    }
  }
}
