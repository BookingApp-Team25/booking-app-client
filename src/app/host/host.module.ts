import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCreationComponent } from './accommodation-creation/accommodation-creation.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import { PropertyContentCardComponent } from './accommodation-creation/property-content-card/property-content-card.component';
import { SinglePropertyComponent } from './accommodation-creation/property-content-card/single-property/single-property.component';
import { DatePriceElementComponent } from './accommodation-creation/date-price-element/date-price-element.component';
import { HostAccommodationsViewComponent } from './host-accommodations-view/host-accommodations-view.component';
import {LayoutModule} from "../layout/layout.module";
import {AccommodationModule} from "../accommodation/accommodation.module";
import { HostReservationRequestViewComponent } from './host-reservation-request-view/host-reservation-request-view.component';
import { HostReservationRequestCardComponent } from './host-reservation-request-view/host-reservation-request-card/host-reservation-request-card.component';
import { HostResolveReservationViewComponent } from './host-resolve-reservation-view/host-resolve-reservation-view.component';
import {RouterLink} from "@angular/router";
import { HostRequestResolveCardComponent } from './host-resolve-reservation-view/host-request-resolve-card/host-request-resolve-card.component';
import { ImageWindowComponent } from './accommodation-creation/image-window/image-window.component';



@NgModule({
  declarations: [
    AccommodationCreationComponent,
    PropertyContentCardComponent,
    SinglePropertyComponent,
    DatePriceElementComponent,
    HostAccommodationsViewComponent,
    HostReservationRequestViewComponent,
    HostReservationRequestCardComponent,
    HostResolveReservationViewComponent,
    HostRequestResolveCardComponent,
    ImageWindowComponent,
  ],
    imports: [
        CommonModule,
        MaterialModule,
        LayoutModule,
        AccommodationModule,
        RouterLink
    ]
})
export class HostModule { }
