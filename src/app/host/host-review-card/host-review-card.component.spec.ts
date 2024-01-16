import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReviewCardComponent } from './host-review-card.component';

describe('HostReviewCardComponent', () => {
  let component: HostReviewCardComponent;
  let fixture: ComponentFixture<HostReviewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostReviewCardComponent]
    });
    fixture = TestBed.createComponent(HostReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
