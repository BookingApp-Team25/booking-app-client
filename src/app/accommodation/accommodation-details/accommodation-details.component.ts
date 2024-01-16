import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationRequest } from '../model/accommodation-request';
import { Reservation } from '../model/accommodation-reservation';
import { ReservationStatus } from '../model/reservation-status';
//import { ReservationComponent } from 'src/app/reservation/reservation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Host } from '../model/host-data';
import { DatePeriod } from '../model/date-period';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

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
  hostName: string;
  showPopup: boolean = false;
  totalPrice: number;
  calculatedDatePrice: number;
  maxGuests: number;

  checkinDate: Date;
  checkoutDate: Date;
  guests: number;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accommodationId = params['id']; // Retrieve accommodationId from URL parameters
      this.accommodationService.getAccommodationById(this.accommodationId).subscribe(
        (data: AccommodationRequest) => {
          this.accommodationDetails = data;
          console.log('Accommodation details:', this.accommodationDetails);

          this.maxGuests = this.accommodationDetails.maxGuests;
  
          this.accommodationService.getHostById(this.accommodationDetails.hostId).subscribe(
            (hostData: Host) => {
              console.log("Host data:", hostData);
              this.hostName = hostData.firstName;
            },
            (error) => {
              console.error('Error fetching host details', error);
            }
          );
  
        },
        (error) => {
          console.error('Error fetching accommodation details', error);
        }
      );
    });
  }

  //pictures part
  currentPhotoIndex = 0;

  get currentPhoto(): string {
    return this.accommodationDetails.photos[this.currentPhotoIndex];
  }

  nextImage() {
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.accommodationDetails.photos.length;
  }

  prevImage() {
    this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.accommodationDetails.photos.length) % this.accommodationDetails.photos.length;
  }

  //date picker filter
  filterDates = (date: Date | null): boolean => {
    // console.log('Checking date:', date);
    const currentDate = new Date();
  
    if (date === null || date < currentDate) {
      return false;
    }
  
    if (this.accommodationDetails.availability) {
      const isDateAvailable = this.accommodationDetails.availability.some((period: DatePeriod) => {
        const availabilityStart = new Date(period.startDate);
        const availabilityEnd = new Date(period.endDate);
        return date >= availabilityStart && date <= availabilityEnd;
      });
  
      // console.log('Date period', this.accommodationDetails.availability);
      // console.log('Is date available:', isDateAvailable);
      return isDateAvailable;
    }
  
    // If there is no availability information, allow all future dates
    return true;
  };
  
  onCheckoutDateChange() {
    console.log('Checkout date changed:', this.checkoutDate);
    this.calculatePriceForPeriod(this.checkinDate, this.checkoutDate);
  }

  lastNumOfGuests = 0;
  onGuestsChange() {
    console.log('Number of guests changed:', this.guests);
    this.calculateTotalPrice(this.guests);
    this.lastNumOfGuests = this.guests
  }
  
  //price calculator
  calculateTotalPrice(numberOfGuests: number): void {
    this.totalPrice = this.calculatedDatePrice * Number(numberOfGuests);
  }

  calculatePriceForPeriod(checkin: Date, checkout: Date) {
    this.accommodationService.calculatePrice(checkin, checkout, this.accommodationId)
    .subscribe(
      price => {
        this.calculatedDatePrice = price;
        console.log("calculatedDatePrice: ", this.calculatedDatePrice);
        
      },
      error => {
        console.error('Error calculating price:', error);
      }
    );
    
    this.calculateTotalPrice(this.guests);
  }

  async getGuestId(): Promise<string> {
    try {
      const result = await this.accommodationService.getGuestByUsername(this.authService.getUsername()).toPromise();
  
      // Use nullish coalescing operator to provide a default value
      return result?.id ?? "defaultGuestId";
    } catch (error) {
      // Throw the error or log it, depending on your error handling strategy
      console.error('Error fetching guest id:', error);
      // Rethrow the error or return a default value
      throw error;
    }
  }
   
  async onReserveClicked(checkin: string, checkout: string, guestsCount: string) {
    try {
      const guestId = await this.getGuestId();
  
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
  
      this.reservation = {
        guestId: guestId,
        hostId: this.accommodationDetails.hostId,
        accommodationId: this.accommodationId,
        reservationStatus: ReservationStatus.Ongoing,
        reservedDate: {
          startDate: checkinDate,
          endDate: checkoutDate
        },
        guestName: this.authService.getUsername(), // Add guest name if available
        accommodationName: this.accommodationDetails.name,
        price: this.totalPrice
      };
  
      console.log("reservation:", this.reservation);
  
      this.accommodationService.createReservation(this.reservation).subscribe(
        (response) => {
          console.log('Reservation created successfully', response);
          this.openSnackBar('Reservation created successfully!');
        },
        (error) => {
          console.error('Error creating reservation', error);
          this.openSnackBar('Error creating reservation.');
        }
      );
    } catch (error) {
      console.error('Error fetching guest id:', error);
    }
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
