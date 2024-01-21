import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReviewResponse } from '../model/review-response';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AccommodationService } from '../accommodation.service';
import { MessageResponse } from '../model/message-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationRequest } from '../model/accommodation-request';
import { ActivatedRoute } from '@angular/router';
import { HostService } from 'src/app/host/host.service';

@Component({
  selector: 'review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  @Input() review:ReviewResponse;
  @Input() accommodationDetails: AccommodationRequest;
  @Input() blockPermission: boolean;
  @Output() deleteReviewEvent: EventEmitter<string> = new EventEmitter<string>();
  role='';
  username='';
  constructor(private authService:AuthService,private accommodationService:AccommodationService
    ,private snackBar:MatSnackBar,private route:ActivatedRoute){}

    ngOnInit() {
      this.role = this.authService.getRole();
      this.username = this.authService.getUsername();
    
      if (this.accommodationDetails!=null) {
        this.blockPermission = this.accommodationDetails.hostUsername === this.authService.getUsername();
      } else {
        this.blockPermission = false;
      }
    }

  deleteReview(){
    this.accommodationService.deleteReview(this.review.id, true).subscribe({
      next:(response:Boolean) => {
        if(response==true){
          this.deleteReviewEvent.emit(this.review.id);
        }
      }
  })
  }

  reportReview(){
    
    this.accommodationService.reportReview(this.review.id).subscribe({
      next:(response:MessageResponse) => {
        if(response.successful){
          this.snackBar.open(response.message, 'Dismiss', {
            duration: 5000,
            panelClass: ['snackbar'],
          });
          this.review.reported = true;
        }
        else {
          this.snackBar.open(response.message, 'Dismiss', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        }
      }
  })
  }
}
