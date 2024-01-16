import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestReservationsViewComponent } from './guest-reservations-view/guest-reservations-view.component';
import { LayoutModule } from "../layout/layout.module";
import { MaterialModule } from "../infrastructure/material/material.module";
import { RouterLink } from '@angular/router';
import { AccommodationModule } from '../accommodation/accommodation.module';
import { ReservationGuestCardComponent } from './guest-reservations-view/reservation-guest-card/reservation-guest-card.component';


@NgModule({
  declarations: [
    GuestReservationsViewComponent,
    ReservationGuestCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    AccommodationModule,
    RouterLink
  ]
})
export class GuestModule { }
