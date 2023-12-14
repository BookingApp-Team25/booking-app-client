import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePriceElementComponent } from './date-price-element.component';

describe('DatePriceElementComponent', () => {
  let component: DatePriceElementComponent;
  let fixture: ComponentFixture<DatePriceElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePriceElementComponent]
    });
    fixture = TestBed.createComponent(DatePriceElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
