import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterModule} from "@angular/router";
import { LoginComponent } from '../infrastructure/auth/login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationDetailsComponent } from '../accommodation/accommodation-details/accommodation-details.component';
import { AccommodationCardComponent } from '../accommodation/accommodation-card/accommodation-card.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent,
    ReviewCardComponent,
    UserProfileComponent,
    FilterDialogComponent,
  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
    LoginComponent,
    AccommodationDetailsComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class LayoutModule { }
