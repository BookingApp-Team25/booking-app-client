import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReservationRequestViewComponent } from './host-reservation-request-view.component';

describe('HostReservationRequestViewComponent', () => {
  let component: HostReservationRequestViewComponent;
  let fixture: ComponentFixture<HostReservationRequestViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostReservationRequestViewComponent]
    });
    fixture = TestBed.createComponent(HostReservationRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
