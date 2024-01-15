import { Component, Input } from '@angular/core';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { HostReservationResponse } from 'src/app/accommodation/model/host-reservation-response';
import { AccommodationRequest } from 'src/app/accommodation/model/accommodation-request'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-guest-card',
  templateUrl: './reservation-guest-card.component.html',
  styleUrls: ['./reservation-guest-card.component.css']
})
export class ReservationGuestCardComponent {
  @Input() request: HostReservationResponse;

  accommodationName: string;
  hostName: string;
  checkInDate: Date;
  checkOutDate: Date;

  //dodati stvati da se popuni kartica dobrim informacijama
  constructor(
    private service: AccommodationService,
    private snackBar: MatSnackBar
    ){}

  getAccommodationName(accommodationId: string) {
    this.service.getAccommodationById(accommodationId).subscribe({
      next: (data: AccommodationRequest) => {
        this.accommodationName = data.name;
        console.log('Accommodation name:', this.accommodationName);
      },
      error: (error) => {
        console.error('Error fetching accommodation name:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }  

  ngOnInit(): void {
    this.getAccommodationName(this.request.accommodationId);
    this.checkInDate = this.request.reservedDate.startDate;
    this.checkOutDate = this.request.reservedDate.endDate;
  }

  cancelReservation() {
    this.service.cancelReservation(this.request.reservationId).subscribe(
      (response) => {
        console.log('Reservation canceled:', response);
        this.openSnackBar('Reservation canceled.');
      },
      (error) => {
        console.error('Error canceling reservation', error);
        this.openSnackBar('Error canceling reservation.');
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
}
