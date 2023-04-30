import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user
      });
    
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
