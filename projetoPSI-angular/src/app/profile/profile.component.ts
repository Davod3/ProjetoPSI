import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User;
  isLogged: boolean;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        this.isLogged = this.authService.getUser()._id == this.user._id;
      },
      error => {
        this.error = 'User not found';
        console.log(this.error);
      });
  }

  save(): void {
    if (this.user) {
      this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
  }

  edit(): void{
    this.router.navigate([`/profile/edit/${this.user._id}`]);
  }

  biblioteca(): void {
    this.router.navigate([`/biblioteca/${this.user._id}`]);
  }

  listas(): void {
    this.router.navigate([`/listas/${this.user._id}`]);
  }

  seguidores(): void {
    this.router.navigate([`/followers/${this.user._id}`]);
  }

  following(): void {
    this.router.navigate([`/following/${this.user._id}`]);
  }

  profile(): void {
    this.router.navigate([`/profile/${this.user._id}`]);
  }

  goBack(): void {
    this.location.back();
  }
}
