import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccommodationDetailsComponent } from './accommodation-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationService } from '../accommodation.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError, of } from 'rxjs';
import { MessageResponse } from '../model/message-response';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MapInsertionComponent } from '../../shared/map-insertion/map-insertion.component';

describe('AccommodationDetailsComponent', () => {
  let component: AccommodationDetailsComponent;
  let fixture: ComponentFixture<AccommodationDetailsComponent>;
  let accommodationService: AccommodationService;
  let snackBar: MatSnackBar;

  // Mock AuthService
  const authServiceMock = {
    getRole: () => 'mockRole',
    getUsername: () => 'mockUsername',
  };

  // Mock HttpClient
  class HttpClientMock {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsComponent, MapInsertionComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientTestingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [
        AccommodationService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: MatSnackBar, useValue: {} },
        { provide: HttpClient, useClass: HttpClientMock },
      ],
    });

    fixture = TestBed.createComponent(AccommodationDetailsComponent);
    component = fixture.componentInstance;
    accommodationService = TestBed.inject(AccommodationService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price when dates and guests are changed', fakeAsync(() => {
    component.checkinDate = new Date('2023-01-01');
    component.checkoutDate = new Date('2023-01-05');
    component.guests = 3;

    spyOn(component, 'calculateTotalPrice').and.callThrough();

    component.onCheckoutDateChange();
    tick();
    component.onGuestsChange();
    tick();

    expect(component.calculateTotalPrice).toHaveBeenCalledWith(3);
  }));

  it('should allow guests to submit reservation requests', fakeAsync(() => {
    component.role = 'ROLE_GUEST';
    const spyCreateReservation = spyOn(accommodationService, 'createReservation').and.returnValue(of({} as MessageResponse));

    component.onReserveClicked('2023-01-01', '2023-01-05', '3');
    tick();

    expect(spyCreateReservation).toHaveBeenCalled();
  }));

  it('should handle server error when creating reservation', fakeAsync(() => {
    component.role = 'ROLE_GUEST';
    spyOn(accommodationService, 'createReservation').and.returnValue(throwError('Server error'));

    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.onReserveClicked('2023-01-01', '2023-01-05', '3');
    tick();

    expect(snackBarOpenSpy).toHaveBeenCalledWith('Error creating reservation.', 'Close');
  }));

  it('should display a confirmation message upon successful reservation', fakeAsync(() => {
    component.role = 'ROLE_GUEST';

    const mockMessageResponse: MessageResponse = {
      successful: true,
      message: 'Reservation created successfully',
    };

    spyOn(accommodationService, 'createReservation').and.returnValue(of(mockMessageResponse));
    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.onReserveClicked('2023-01-01', '2023-01-05', '3');
    tick();

    expect(snackBarOpenSpy).toHaveBeenCalledWith('Reservation created successfully!', 'Close');
  }));
});
