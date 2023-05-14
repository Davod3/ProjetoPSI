import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetoPSI-angular';
  constructor(public auth: AuthenticationService) {}

  isUserLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}


