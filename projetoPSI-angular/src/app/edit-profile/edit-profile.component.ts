import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  user: User; 

  constructor(
    private location: Location,
    private userService: UserService,
    private authService: AuthenticationService
  ){}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  goBack(): void {
    this.location.back();
  }
}
