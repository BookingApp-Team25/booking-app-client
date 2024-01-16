import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationRequest } from '../model/accommodation-request';
import { Reservation } from '../model/accommodation-reservation';
import { ReservationStatus } from '../model/reservation-status';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewRequest } from '../model/review-request';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ReviewType } from '../enum/reviewtype';
import { MessageResponse } from '../model/message-response';
import { ReviewResponse } from '../model/review-response';
//import { ReservationComponent } from 'src/app/reservation/reservation.component';

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
  ratingArr: number[] = [];
  @Input('rating') rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Output() private ratingUpdated = new EventEmitter();
  role='';
  reviewPermission=false;
  reviews:ReviewResponse[]=[];

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private snackBar:MatSnackBar, private authService:AuthService
  ) {}

    reviewForm=new FormGroup ({
      comment: new FormControl('',Validators.required)
    })

    createReview(): void {
      const review: ReviewRequest= {
        guestUsername: this.authService.getUsername(),
        reviewedEntity: this.accommodationId,
        comment: this.reviewForm.value.comment || '',
        rating: this.rating,
        type: ReviewType.AccommodationReview
      }
      this.accommodationService.createReview(review).subscribe({
        next:(response: MessageResponse) => {
          if(response.successful){
            this.snackBar.open(response.message, 'Dismiss', {
              duration: 10000,
              panelClass: ['snackbar'],
            });
            this.toggleCommentField();
        }
      }
      })
    }

  ngOnInit() {
    this.role=this.authService.getRole();
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.route.params.subscribe(params => {
      this.accommodationId = params['id']; // Retrieve accommodationId from URL parameters
      this.accommodationService.getAccommodationById(this.accommodationId).subscribe(
        (data: AccommodationRequest) => {
          this.accommodationDetails = data;
        },
        (error) => {
          console.error('Error fetching accommodation details', error);
        }
      );
    });

    
    this.accommodationService.getAllReviews(this.accommodationId).subscribe(
      (data:ReviewResponse[]) => {
        console.log(data);
        this.reviews=data;
      }
    );

    if(this.role=='ROLE_GUEST' || this.role=='ROLE_Host'){
      const guestUsername= this.authService.getUsername();
      this.accommodationService.checkReviewPermission(guestUsername,this.accommodationId).subscribe(
        (response:Boolean) => {
          if(response){
            this.reviewPermission=true;
          }
        }
      )
    }
  }

  onDeleteReview(reviewId: string) {
    // Remove the deleted review from the reviews array
    this.reviews = this.reviews.filter(review => review.id !== reviewId);
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(rating:number) {
    this.rating = rating;
    this.ratingUpdated.emit(rating);
    return false;
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
      },
      guestName:"",
      accommodationName:"",
      price:0
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
