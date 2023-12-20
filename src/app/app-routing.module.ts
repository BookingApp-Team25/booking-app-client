import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import { RegistrationComponent } from "./layout/registration/registration.component";
import { LoginComponent } from './layout/login/login.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import {AccommodationCreationComponent} from "./host/accommodation-creation/accommodation-creation.component";
import {AccommodationRequestsComponent} from "./admin/accommodation-requests/accommodation-requests.component";
import {HostAccommodationsViewComponent} from "./host/host-accommodations-view/host-accommodations-view.component";

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: AccommodationDetailsComponent, path:"home/accommodationView"},
  { component: UserProfileComponent, path: "userProfile" },
  { component: RegistrationComponent, path: "registration" },
  { component: AccommodationCreationComponent, path: "accommodation-creation"},
  { component: AccommodationRequestsComponent, path : "accommodation-requests"},
  { component: LoginComponent, path: 'login' },
  { component: HostAccommodationsViewComponent, path : "host-accommodations"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

