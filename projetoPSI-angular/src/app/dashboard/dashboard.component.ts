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
    let id = this.user._id;
    this.router.navigate([`/profile/${id}`]);
  }
}
