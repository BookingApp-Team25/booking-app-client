import { Component } from '@angular/core';
import { ReviewResponse } from '../../accommodation/model/review-response';
import { AccommodationService } from '../../accommodation/accommodation.service';

@Component({
  selector: 'app-comment-rating-review',
  templateUrl: './comment-rating-review.component.html',
  styleUrls: ['./comment-rating-review.component.css']
})
export class CommentRatingReviewComponent {
  summaries: ReviewResponse[];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.loadReportedReviews();
  }

  loadReportedReviews(): void {
    this.accommodationService.getAllReportedReviews().subscribe({
      next:(reportedReviews: ReviewResponse[]) => {
        this.summaries = reportedReviews;
        console.log("Reports: ", this.summaries);
      },
      error: (_) => {console.log('Error fetching reported reviews:')}
    });
  }
}