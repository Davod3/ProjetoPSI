import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {
  users$: Observable<User[]>;

  constructor(private userService: UserService) { }

  search(event: any): void {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      this.users$ = this.userService.searchUsers(searchTerm);
    } else {
      this.users$ = null;
    }
  }
}
