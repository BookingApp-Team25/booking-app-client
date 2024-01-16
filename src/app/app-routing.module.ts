import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import { RegistrationComponent } from "./infrastructure/auth/registration/registration.component";
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { UserProfileComponent } from './infrastructure/auth/user-profile/user-profile.component';
import { ActivationComponent } from './infrastructure/auth/activation/activation.component';
import {AccommodationCreationComponent} from "./host/accommodation-creation/accommodation-creation.component";
import {AccommodationRequestsComponent} from "./admin/accommodation-requests/accommodation-requests.component";
import {HostAccommodationsViewComponent} from "./host/host-accommodations-view/host-accommodations-view.component";
import { HostDetailsComponent } from './host/host-details/host-details.component';
import { MyguestsComponent } from './host/myguests/myguests.component';

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: AccommodationDetailsComponent, path:"home/accommodation"},
  { component: UserProfileComponent, path: "user-profile" },
  { component: RegistrationComponent, path: "registration" },
  { component:  ActivationComponent, path: "activation/:code"},
  { component: AccommodationCreationComponent, path: "accommodation-creation"},
  { component: AccommodationRequestsComponent, path : "accommodation-requests"},
  { component: HostAccommodationsViewComponent, path : "host-accommodations"},
  { component: HostDetailsComponent, path: "host-details/:hostId" },
  {component:MyguestsComponent,path: "home/my-guests"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

