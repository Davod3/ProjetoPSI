import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { throwError } from 'rxjs';


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
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ){}

  ngOnInit(): void {
    // this.user = this.authService.getUser();
    this.getUser();
  }

  getUser(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user
        if(this.authService.getUser()._id != this.user._id)
          throwError(() => new Error('test'));
      });
  }

  goBack(): void {
    this.location.back();
  }
}
