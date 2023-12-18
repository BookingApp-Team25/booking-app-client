import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import { RegistrationComponent } from "./infrastructure/auth/registration/registration.component";
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { UserProfileComponent } from './infrastructure/auth/user-profile/user-profile.component';
import { ActivationComponent } from './infrastructure/auth/activation/activation.component';

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: AccommodationDetailsComponent, path:"home/accommodation"},
  { component: UserProfileComponent, path: "user-profile" },
  { component: RegistrationComponent, path: "registration" },
  { component:  ActivationComponent, path: "activation/:code"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

