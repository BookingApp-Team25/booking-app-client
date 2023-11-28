import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { ReviewCardComponent } from './review-card/review-card.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent,
    ReviewCardComponent
  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
    LoginComponent,
    AccommodationDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
