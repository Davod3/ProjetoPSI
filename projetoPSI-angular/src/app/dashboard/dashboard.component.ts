import { Component } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { ItemsComponent } from '../items/items.component';
import { BibliotecaComponent } from '../biblioteca/biblioteca.component';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private authService: AuthenticationService) {}

  biblioteca(): void {
    this.router.navigate(["/biblioteca"]);
  }

  listas(): void {
    this.router.navigate(["/listas"]);
  }

  seguidores(): void {
    this.router.navigate(["/seguidores"]);
  }

  following(): void {
    this.router.navigate(["/following"]);
  }

  perfil(): void {
    //Nothing yet
  }

  getUser(): User {
    const user = this.authService.getUser();
    return user;
  }
}
