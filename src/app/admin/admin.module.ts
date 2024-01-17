import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationRequestsComponent } from './accommodation-requests/accommodation-requests.component';
import {AccommodationModule} from "../accommodation/accommodation.module";
import {MaterialModule} from "../infrastructure/material/material.module";
import { CommentRatingReviewComponent } from './comment-rating-review/comment-rating-review.component';
import { CommentCardComponent } from './comment-rating-review/comment-card/comment-card.component';

@NgModule({
  declarations: [
    AccommodationRequestsComponent,
    CommentRatingReviewComponent,
    CommentCardComponent
  ],
  imports: [
    CommonModule,
    AccommodationModule,
    MaterialModule
  ],
  exports: [
      AccommodationRequestsComponent,
      CommentRatingReviewComponent,
      CommentCardComponent
  ]
})
export class AdminModule { }
