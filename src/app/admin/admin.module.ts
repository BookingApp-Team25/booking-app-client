import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationRequestsComponent } from './accommodation-requests/accommodation-requests.component';
import {AccommodationModule} from "../accommodation/accommodation.module";
import {MaterialModule} from "../infrastructure/material/material.module";
import { CommentRatingReviewComponent } from './comment-rating-review/comment-rating-review.component';
import { CommentCardComponent } from './comment-rating-review/comment-card/comment-card.component';
import { UserBlockingComponent } from './user-blocking/user-blocking.component';
import { UserCardComponent } from './user-blocking/user-card/user-card.component';

@NgModule({
  declarations: [
    AccommodationRequestsComponent,
    CommentRatingReviewComponent,
    CommentCardComponent,
    UserBlockingComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    AccommodationModule,
    MaterialModule
  ],
  exports: [
      AccommodationRequestsComponent,
      CommentRatingReviewComponent,
      CommentCardComponent,
      UserBlockingComponent,
      UserCardComponent
  ]
})
export class AdminModule { }
