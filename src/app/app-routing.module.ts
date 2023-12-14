import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import { RegistrationComponent } from "./infrastructure/auth/registration/registration.component";
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { UserProfileComponent } from './infrastructure/auth/user-profile/user-profile.component';

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: AccommodationDetailsComponent, path:"home/accommodationView"},
  { component: UserProfileComponent, path: "userProfile" },
  { component: RegistrationComponent, path: "registration" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

