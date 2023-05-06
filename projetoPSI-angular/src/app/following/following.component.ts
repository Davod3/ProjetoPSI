import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute} from '@angular/router';
import { User } from '../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit{

  following: User[] = [];

  constructor(

    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,

    ){}


  ngOnInit(): void {

      this.buildPage();

  }

  private buildPage(): void {

    const id = String(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserFollowing(id)
      .subscribe(following => {

        this.following = following;

        });

  }

  goBack(): void {
    this.location.back();
  }

  followUser(userId: string, followingUserId: string): void {
    this.userService.addUserToFollowingList(userId, followingUserId)
      .subscribe(user => {
        this.buildPage();
      });
  }

}
