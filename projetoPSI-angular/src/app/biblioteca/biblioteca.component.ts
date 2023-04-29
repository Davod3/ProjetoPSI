import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

  items: Item[] = [];
  user: User;

  constructor(private itemService: ItemService, 
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
        
        this.user.items.forEach(itemid => {
          
          this.itemService.getItem(itemid).subscribe(item => this.items.push(item));

        });

      });
    
  }

}
