import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationGuestCardComponent } from './reservation-guest-card.component';

describe('ReservationGuestCardComponent', () => {
  let component: ReservationGuestCardComponent;
  let fixture: ComponentFixture<ReservationGuestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationGuestCardComponent]
    });
    fixture = TestBed.createComponent(ReservationGuestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
