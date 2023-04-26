import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component'
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', component: AppComponent},
  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
