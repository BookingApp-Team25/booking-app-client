import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRatingReviewComponent } from './comment-rating-review.component';

describe('CommentRatingReviewComponent', () => {
  let component: CommentRatingReviewComponent;
  let fixture: ComponentFixture<CommentRatingReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentRatingReviewComponent]
    });
    fixture = TestBed.createComponent(CommentRatingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
