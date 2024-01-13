import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetailedReportComponent } from './accommodation-detailed-report.component';

describe('AccommodationDetailedReportComponent', () => {
  let component: AccommodationDetailedReportComponent;
  let fixture: ComponentFixture<AccommodationDetailedReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailedReportComponent]
    });
    fixture = TestBed.createComponent(AccommodationDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
