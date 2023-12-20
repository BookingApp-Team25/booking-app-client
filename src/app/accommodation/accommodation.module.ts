import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationRequestCardComponent } from './accommodation-request-card/accommodation-request-card.component';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { AccommodationHostCardComponent } from './accommodation-host-card/accommodation-host-card.component';



@NgModule({
  declarations: [
    AccommodationRequestCardComponent,
    AccommodationHostCardComponent
  ],
    exports: [
        AccommodationRequestCardComponent,
        AccommodationHostCardComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ]
})
export class AccommodationModule { }
