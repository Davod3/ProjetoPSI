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
    password: ''
  };

  constructor(
    private authenticator: AuthenticationService,
    private router: Router
  ){

  };

  register() {
    this.authenticator.register(this.credentials).subscribe(() => {
      console.log('User Registered');
    });
  }

}
