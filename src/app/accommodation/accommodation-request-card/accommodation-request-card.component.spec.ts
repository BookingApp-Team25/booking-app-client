import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRequestCardComponent } from './accommodation-request-card.component';

describe('AccommodationRequestCardComponent', () => {
  let component: AccommodationRequestCardComponent;
  let fixture: ComponentFixture<AccommodationRequestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationRequestCardComponent]
    });
    fixture = TestBed.createComponent(AccommodationRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
