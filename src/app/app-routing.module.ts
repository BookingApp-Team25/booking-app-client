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
import {
  HostReservationRequestViewComponent
} from "./host/host-reservation-request-view/host-reservation-request-view.component";
import {
  HostResolveReservationViewComponent
} from "./host/host-resolve-reservation-view/host-resolve-reservation-view.component";
import {ReportGenerationComponent} from "./host/report-generation/report-generation.component";
import {
  AccommodationDetailedReportComponent
} from "./host/report-generation/accommodation-detailed-report/accommodation-detailed-report.component";

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: AccommodationDetailsComponent, path:"home/accommodation"},
  { component: UserProfileComponent, path: "user-profile" },
  { component: RegistrationComponent, path: "registration" },
  { component:  ActivationComponent, path: "activation/:code"},
  { component: AccommodationCreationComponent, path: "accommodation-creation"},
  { component: AccommodationRequestsComponent, path : "accommodation-requests"},
  { component: HostAccommodationsViewComponent, path : "host-accommodations"},
  {component: HostReservationRequestViewComponent, path: "host-reservation-requests"},
  {component: HostResolveReservationViewComponent, path: "host-resolve-accommodation-request"},
  {component: ReportGenerationComponent, path:"host-generate-report"},
  {component: AccommodationDetailedReportComponent, path:"annual-report"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

