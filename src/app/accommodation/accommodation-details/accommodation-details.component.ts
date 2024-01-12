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
  maxGuests: number;

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
  
  //price calculator
  calculateTotalPrice(checkin: string, checkout: string, numberOfGuests: string): number {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    const timeDifference = checkoutDate.getTime() - checkinDate.getTime(); //in ms
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); //to get days

    this.totalPrice = daysDifference * this.accommodationDetails.pricelist.dailyPrice * Number(numberOfGuests);
    return this.totalPrice;
  }

  onReserveClicked(checkin: string, checkout: string, guestsCount: string) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    
    this.reservation = {
      guestId: '550e8400-e29b-41d4-a716-446655440000',
      hostId: this.accommodationDetails.hostId, //'760e8230-e21b-21d4-a756-123455440002',
      accommodationId: this.accommodationId, //id got from router[routerLink]="['accommodation', { id: summary.accommodationId}] "
      reservationStatus: ReservationStatus.Ongoing,
      reservedDate: {
        startDate: checkinDate,
        endDate: checkoutDate
      },
      guestName:"",
      accommodationName: this.accommodationDetails.name,
      price: this.totalPrice
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
