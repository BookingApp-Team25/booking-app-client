import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyReportCardComponent } from './monthly-report-card.component';

describe('MonthlyReportCardComponent', () => {
  let component: MonthlyReportCardComponent;
  let fixture: ComponentFixture<MonthlyReportCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyReportCardComponent]
    });
    fixture = TestBed.createComponent(MonthlyReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
