import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import { RegistrationComponent } from "./layout/registration/registration.component";
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import {AccommodationCreationComponent} from "./host/accommodation-creation/accommodation-creation.component";
import {AccommodationRequestsComponent} from "./admin/accommodation-requests/accommodation-requests.component";

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: AccommodationDetailsComponent, path:"home/accommodationView"},
  { component: UserProfileComponent, path: "userProfile" },
  { component: RegistrationComponent, path: "registration" },
  { component: AccommodationCreationComponent, path: "accommodation-creation"},
  { component: AccommodationRequestsComponent, path : "accommodation-requests"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

