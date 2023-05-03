import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { ListasComponent } from './listas/listas.component';
import { FollowingComponent } from './following/following.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { LoginComponent } from './login/login.component';
import { FollowersComponent } from './followers/followers.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'search', component: ItemSearchComponent},
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'biblioteca/:id', component: BibliotecaComponent},
  { path: 'listas/:id', component: ListasComponent},
  { path: 'followers/:id', component: FollowersComponent},
  { path: 'following/:id', component: FollowingComponent},
  { path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
