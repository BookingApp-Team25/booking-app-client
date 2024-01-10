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
import { HostDetailsComponent } from './host-details/host-details.component';
import { ReviewCardComponent } from '../accommodation/review-card/review-card.component';
import { HostReviewCardComponent } from './host-review-card/host-review-card.component';
import { AccommodationHostCardComponent } from '../accommodation/accommodation-host-card/accommodation-host-card.component';

@NgModule({
    declarations: [
        AccommodationCreationComponent,
        PropertyContentCardComponent,
        SinglePropertyComponent,
        DatePriceElementComponent,
        HostAccommodationsViewComponent,
        HostDetailsComponent,
        HostReviewCardComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LayoutModule,
        AccommodationModule
    ]
})
export class HostModule { }
