import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReportCardComponent } from './accommodation-report-card.component';

describe('AccommodationReportCardComponent', () => {
  let component: AccommodationReportCardComponent;
  let fixture: ComponentFixture<AccommodationReportCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationReportCardComponent]
    });
    fixture = TestBed.createComponent(AccommodationReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
