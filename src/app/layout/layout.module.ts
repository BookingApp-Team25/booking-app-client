import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterModule} from "@angular/router";
import { LoginComponent } from '../infrastructure/auth/login/login.component';
import { RegistrationComponent } from '../infrastructure/auth/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationDetailsComponent } from '../accommodation/accommodation-details/accommodation-details.component';
import { AccommodationCardComponent } from '../accommodation/accommodation-card/accommodation-card.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { UserProfileComponent } from '../infrastructure/auth/user-profile/user-profile.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AysDialogComponent } from './ays-dialog/ays-dialog.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { SharedModule } from '../shared/shared.module';

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
    AysDialogComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    SharedModule
  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
    LoginComponent,
    AccommodationDetailsComponent,
    UserProfileComponent,
    AysDialogComponent,
    FilterDialogComponent,
    AccommodationCardComponent
  ]
})
export class LayoutModule { }
