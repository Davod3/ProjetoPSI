import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private authService: AuthenticationService) {}

  biblioteca(): void {
    this.router.navigate(["/biblioteca"]);
  }

  listas(): void {
    this.router.navigate(["/listas"]);
  }

  seguidores(): void {
    this.router.navigate(["/seguidores"]);
  }

  following(): void {
    this.router.navigate(["/following"]);
  }

  profile(): void {
    const user = this.authService.getUser();;
    const id = user._id;
    console.log(id);
    this.router.navigate([`/profile/${id}`]);
  }
}
