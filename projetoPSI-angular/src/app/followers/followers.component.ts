import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {

  followers: User[] = [];
  user: User;

  constructor( 
    
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router){}


  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()){
        
  
      this.buildPage();
    
    } else {
    
      this.router.navigateByUrl('/registration');
    
    }
    
  }

  private buildPage(): void {
    
    const id = String(this.route.snapshot.paramMap.get('id'));
  
    this.userService.getUser(id)
      .subscribe(user => {
          
        this.user = user
          
        this.user.followers.forEach(followerid => {
            
          this.userService.getUser(followerid).subscribe(user => this.followers.push(user));
  
        });
  
        });
      
    }

}
