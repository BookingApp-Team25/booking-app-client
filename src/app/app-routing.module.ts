import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import { AccommodationDetailsComponent } from './layout/accommodation-details/accommodation-details.component';

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: AccommodationDetailsComponent, path:"home/accommodationView"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
