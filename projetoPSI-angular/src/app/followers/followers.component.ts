import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute} from '@angular/router';
import { User } from '../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {

  followers: User[] = [];

  constructor( 
    
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
    
    ){}


  ngOnInit(): void {
    
      this.buildPage();
    
  }

 private buildPage(): void {
    
    const id = String(this.route.snapshot.paramMap.get('id'));
  
    this.userService.getUserFollowers(id)
      .subscribe(followers => {
          
        this.followers = followers;
  
        });
      
    } 

  goBack(): void {
    this.location.back();
  }

}
