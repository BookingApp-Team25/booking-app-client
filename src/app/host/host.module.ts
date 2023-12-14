import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCreationComponent } from './accommodation-creation/accommodation-creation.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import { PropertyContentCardComponent } from './accommodation-creation/property-content-card/property-content-card.component';
import { SinglePropertyComponent } from './accommodation-creation/property-content-card/single-property/single-property.component';
import { DatePriceElementComponent } from './accommodation-creation/date-price-element/date-price-element.component';



@NgModule({
  declarations: [
    AccommodationCreationComponent,
    PropertyContentCardComponent,
    SinglePropertyComponent,
    DatePriceElementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class HostModule { }
