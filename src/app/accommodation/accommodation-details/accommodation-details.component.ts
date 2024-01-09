import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationRequest } from '../model/accommodation-request';
import { Reservation } from '../model/accommodation-reservation';
import { ReservationStatus } from '../model/reservation-status';
//import { ReservationComponent } from 'src/app/reservation/reservation.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {
  showCommentField = false;
  accommodationDetails: AccommodationRequest;
  reservation: Reservation;
  //reservationComponent: ReservationComponent;
  accommodationId: string;
  showPopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accommodationId = params['id']; // Retrieve accommodationId from URL parameters
      this.accommodationService.getAccommodationById(this.accommodationId).subscribe(
        (data: AccommodationRequest) => {
          this.accommodationDetails = data;
          console.log('Accommodation details:', this.accommodationDetails);
        },
        (error) => {
          console.error('Error fetching accommodation details', error);
        }
      );
    });
  }

  onReserveClicked(checkin: string, checkout: string, guestsCount: string) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    
    this.reservation = {
      guestId: '550e8400-e29b-41d4-a716-446655440000',
      hostId: '760e8230-e21b-21d4-a756-123455440002', // this.accommodationDetails.hostId, ne radi
      accommodationId: this.accommodationId, //id got from router[routerLink]="['accommodation', { id: summary.accommodationId}] "
      reservationStatus: ReservationStatus.Ongoing,
      reservedDate: {
        startDate: checkinDate,
        endDate: checkoutDate
      }
    }
    //this.reservationComponent.reserve();
    console.log("reservation:", this.reservation);

    this.accommodationService.createReservation(this.reservation).subscribe(
      (response) => {
        console.log('Reservation created successfully', response);
        this.openSnackBar('Reservation created successfully!');
      },
      (error) => {
        console.error('Error creating reservation', error);
        this.openSnackBar('Error creating reservation');
      }
    );
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'] //ne radi nz sto
    });
  }

  toggleCommentField() {
    this.showCommentField = !this.showCommentField;
  }
}
