import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantAddComponent } from './components/restaurant-add/restaurant-add.component';
import { RestaurantEditComponent } from './components/restaurant-edit/restaurant-edit.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'add', component: RestaurantAddComponent },
  { path: 'edit/:id', component: RestaurantEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
