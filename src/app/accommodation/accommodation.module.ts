import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationRequestCardComponent } from './accommodation-request-card/accommodation-request-card.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AccommodationRequestCardComponent
  ],
  exports: [
    AccommodationRequestCardComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class AccommodationModule { }
