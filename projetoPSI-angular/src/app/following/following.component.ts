import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit{

  following: User[] = [];
  user: User;

  constructor( 
    
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router){}


  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()){
      
      console.log("This happens 1");

      this.buildPage();

      console.log("This happens 2");
  
    } else {
  
      this.router.navigateByUrl('/registration');
  
    }
  
  }

  private buildPage(): void {
    
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user
        
        this.user.following.forEach(followid => {
          
          this.userService.getUser(followid).subscribe(user => this.following.push(user));

        });

        console.log(this.user);

      });
    
  }

}
