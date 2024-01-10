import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReservationRequestCardComponent } from './host-reservation-request-card.component';

describe('HostReservationRequestCardComponent', () => {
  let component: HostReservationRequestCardComponent;
  let fixture: ComponentFixture<HostReservationRequestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostReservationRequestCardComponent]
    });
    fixture = TestBed.createComponent(HostReservationRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
