import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationRequestsComponent } from './accommodation-requests/accommodation-requests.component';
import {AccommodationModule} from "../accommodation/accommodation.module";
import {MaterialModule} from "../infrastructure/material/material.module";



@NgModule({
  declarations: [
    AccommodationRequestsComponent
  ],
  imports: [
    CommonModule,
    AccommodationModule,
    MaterialModule
  ]
})
export class AdminModule { }
