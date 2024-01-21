import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostResolveReservationViewComponent } from './host-resolve-reservation-view.component';

describe('HostResolveReservationViewComponent', () => {
  let component: HostResolveReservationViewComponent;
  let fixture: ComponentFixture<HostResolveReservationViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostResolveReservationViewComponent]
    });
    fixture = TestBed.createComponent(HostResolveReservationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
