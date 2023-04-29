import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private router: Router, private authService: AuthenticationService) {}

  private user : User;

  ngOnInit(): void {

    if(this.authService.isLoggedIn()){

      this.user = this.authService.getUser();

    } else {

      this.router.navigateByUrl('/registration');

    }
  }

  biblioteca(): void {
    this.router.navigate([`/biblioteca/${this.user._id}`]);
  }

  listas(): void {
    this.router.navigate([`/listas/${this.user._id}`]);
  }

  seguidores(): void {
    this.router.navigate([`/seguidores/${this.user._id}`]);
  }

  following(): void {
    this.router.navigate([`/following/${this.user._id}`]);
  }

  profile(): void {
    this.router.navigate([`/profile/${this.user._id}`]);
  }
}
