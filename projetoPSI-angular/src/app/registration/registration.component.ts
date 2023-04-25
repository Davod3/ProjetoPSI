import { Component } from '@angular/core';
import { UserToken } from '../token'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  credentials: UserToken = {
    username: '',
    password: '',
    isValid: true,
    err: []

  };

  constructor(
    private authenticator: AuthenticationService,
    private router: Router
  ){

  };

  register() {

    this.credentials.err = [];
    this.credentials.isValid = true;
    const validPassword = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$');
    const validUsername = new RegExp('^[a-zA-Z0-9]+$');

    if(this.credentials.username.length < 3) {
        this.credentials.isValid = false;
        this.credentials.err.push("Username must have more than 3 characters!");
    }

    if(this.credentials.password.length < 8) {
        this.credentials.isValid = false;
        this.credentials.err.push("Password must have more than 8 characters!");
    }

    if(!validPassword.test(this.credentials.password)) {
        this.credentials.isValid = false;
        this.credentials.err.push("Password must contain at least one Upper case letter, one Lower case letter and one number!");
    }

    if(!validUsername.test(this.credentials.username)) {
        this.credentials.isValid= false;
        this.credentials.err.push("Username must contain only alphanumeric characters!");
    }

    if(this.credentials.isValid){

      this.authenticator.register(this.credentials).subscribe((response) => {
       
        if(response.err){
          
          this.credentials.isValid = false;
          
          response.err.forEach(error => {
            this.credentials.err.push(error);
          });

        } else {

          console.log("User registered!");

          //Redirect to dashboard

        }

      });

    }

  }

}
