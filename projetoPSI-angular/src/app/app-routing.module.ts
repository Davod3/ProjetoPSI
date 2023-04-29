import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { ListasComponent } from './listas/listas.component';
import { SeguidoresComponent } from './seguidores/seguidores.component';
import { FollowingComponent } from './following/following.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'biblioteca/:id', component: BibliotecaComponent},
  { path: 'listas', component: ListasComponent},
  { path: 'seguidores', component: SeguidoresComponent},
  { path: 'following', component: FollowingComponent},
  { path: 'profile/:id', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
