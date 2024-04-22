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
import {
  HostReservationRequestViewComponent
} from "./host/host-reservation-request-view/host-reservation-request-view.component";
import {
  HostResolveReservationViewComponent
} from "./host/host-resolve-reservation-view/host-resolve-reservation-view.component";
import { GuestReservationsViewComponent } from './guest/guest-reservations-view/guest-reservations-view.component';
import {ReportGenerationComponent} from "./host/report-generation/report-generation.component";
import {
  AccommodationDetailedReportComponent
} from "./host/report-generation/accommodation-detailed-report/accommodation-detailed-report.component";
import { CommentRatingReviewComponent } from './admin/comment-rating-review/comment-rating-review.component';
import { UserBlockingComponent } from './admin/user-blocking/user-blocking.component';
import { FavouriteAccommodationComponent } from './guest/favourite-accommodation/favourite-accommodation.component';
import { CertificateTreeComponent } from './shared/certificate-tree/certificate-tree.component';

const routes: Routes = [
  { component: HomeComponent, path:"home" },
  { component: AccommodationDetailsComponent, path:"home/accommodation" },
  { component: UserProfileComponent, path: "user-profile" },
  { component: RegistrationComponent, path: "registration" },
  { component: GuestReservationsViewComponent, path: "guest-reservations-view" },
  { component:  ActivationComponent, path: "activation/:code"},
  { component: AccommodationCreationComponent, path: "accommodation-creation"},
  { component: AccommodationRequestsComponent, path : "accommodation-requests"},
  { component: HostAccommodationsViewComponent, path : "host-accommodations"},
  { component: HostDetailsComponent, path: "host-details/:hostId" },
  {component:MyguestsComponent,path: "home/my-guests"},
  {component: HostReservationRequestViewComponent, path: "host-reservation-requests"},
  {component: HostResolveReservationViewComponent, path: "host-resolve-accommodation-request"},
  {component: ReportGenerationComponent, path:"host-generate-report"},
  {component: AccommodationDetailedReportComponent, path:"annual-report"},
  {component: CommentRatingReviewComponent, path:"comment-review"},
  {component: UserBlockingComponent, path:"user-blocking"},
  {component: FavouriteAccommodationComponent, path:"guest-favourite-accommodations"},
  {component: CertificateTreeComponent, path:"admin-certificate-tree"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

