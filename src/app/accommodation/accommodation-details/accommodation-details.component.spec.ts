import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccommodationDetailsComponent } from './accommodation-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccommodationService } from '../accommodation.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError, of } from 'rxjs';
import { MessageResponse } from '../model/message-response';
import { AuthService } from '../../infrastructure/auth/auth.service';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule, RouterTestingModule],
      providers: [
        AccommodationService,
        { provide: AuthService, useValue: authServiceMock },
        MatSnackBar, // Include MatSnackBar directly as a provider
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

    spyOn(component, 'calculateTotalPrice').and.callThrough(); // Spy on the method to check if it's called

    component.onCheckoutDateChange();
    tick(); // Ensure all asynchronous operations are completed
    component.onGuestsChange();
    tick();

    expect(component.calculateTotalPrice).toHaveBeenCalledWith(3);
  }));

  it('should allow guests to submit reservation requests', fakeAsync(() => {
    component.role = 'ROLE_GUEST';
    const spyCreateReservation = spyOn(component.accommodationService, 'createReservation').and.returnValue(of({} as MessageResponse));

    component.onReserveClicked('2023-01-01', '2023-01-05', '3');
    tick();

    expect(spyCreateReservation).toHaveBeenCalled();
  }));

  it('should handle server error when creating reservation', fakeAsync(() => {
    component.role = 'ROLE_GUEST';
    spyOn(component.accommodationService, 'createReservation').and.returnValue(throwError('Server error'));

    const snackBarOpenSpy = spyOn(component.snackBar, 'open');

    component.onReserveClicked('2023-01-01', '2023-01-05', '3');
    tick();

    expect(snackBarOpenSpy).toHaveBeenCalledWith('Error creating reservation.', 'Close');
  }));

  it('should display a confirmation message upon successful reservation', fakeAsync(() => {
    (component as any).role = 'ROLE_GUEST'; // Accessing private property using as any
    
    const mockMessageResponse: MessageResponse = {
      successful: true,
      message: 'Reservation created successfully'
    };

    spyOn((component as any).accommodationService, 'createReservation').and.returnValue(of(mockMessageResponse));
    const snackBarOpenSpy = spyOn((component as any).snackBar, 'open');

    component.onReserveClicked('2023-01-01', '2023-01-05', '3');
    tick();

    expect(snackBarOpenSpy).toHaveBeenCalledWith('Reservation created successfully!', 'Close');
  }));
});
