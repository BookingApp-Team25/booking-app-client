import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { AccommodationRequest } from 'src/app/accommodation/model/accommodation-request';
import { ReviewResponse } from 'src/app/accommodation/model/review-response';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MessageResponse } from 'src/app/infrastructure/auth/model/message-response';
import { HostService } from '../host.service';
import { HostDetailsResponse } from '../model/host-details-response';
import { AccountDetails } from 'src/app/infrastructure/auth/model/account-details';

@Component({
  selector: 'host-review-card',
  templateUrl: './host-review-card.component.html',
  styleUrls: ['./host-review-card.component.css']
})
export class HostReviewCardComponent {
  @Input() review:ReviewResponse;
  @Input() blockPermission: boolean;
  @Input() hostDetails:AccountDetails;
  @Output() deleteReviewEvent: EventEmitter<string> = new EventEmitter<string>();
  role='';
  username='';
  constructor(private authService:AuthService
    ,private snackBar:MatSnackBar,private route:ActivatedRoute,private hostService:HostService){}

  ngOnInit(){
    this.role=this.authService.getRole();
    this.username=this.authService.getUsername();
  }

  deleteReview(){
    this.hostService.deleteReview(this.review.id).subscribe({
      next:(response:Boolean) => {
        if(response==true){
          this.deleteReviewEvent.emit(this.review.id);
        }
      }
  })
  }

  reportReview(){
    this.hostService.reportReview(this.review.id).subscribe({
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
