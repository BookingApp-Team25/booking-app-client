import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HostService } from '../host.service';
import { ReviewRequest } from 'src/app/accommodation/model/review-request';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ReviewType } from 'src/app/accommodation/enum/reviewtype';
import { MessageResponse } from 'src/app/infrastructure/auth/model/message-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountDetails } from 'src/app/infrastructure/auth/model/account-details';
import { ReviewResponse } from 'src/app/accommodation/model/review-response';
import { ActivatedRoute } from '@angular/router';
import { ReportDialogComponent } from 'src/app/layout/report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.css']
})
export class HostDetailsComponent implements OnInit {
  @Input('rating') rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Output() private ratingUpdated = new EventEmitter();
  role='';
  reviewPermission=false;
  showCommentField=false;
  ratingArr: number[] = [];
  hostDetails: AccountDetails;
  reviews: ReviewResponse[]=[];
  hostId: string;
  reportPermission:boolean;
  constructor(private service:HostService,private authService:AuthService,private snackBar:MatSnackBar
    ,private route:ActivatedRoute,private dialog:MatDialog){}

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.hostId = params['hostId'];
      });
    
      this.role = this.authService.getRole();
    
      for (let index = 0; index < this.starCount; index++) {
        this.ratingArr.push(index);
      }
    
      this.service.getHostDetails(this.hostId).pipe(
        switchMap((response: AccountDetails) => {
          this.hostDetails = response;
    
          // Return the result of checkReportPermission observable
          return this.service.checkReportPermission(this.authService.getUsername(), this.hostDetails.username);
        })
      ).subscribe({
        next: (response: Boolean) => {
          if (response) {
            this.reportPermission = true;
          } else {
            this.reportPermission = false;
          }
        }
      });
    
      this.service.getAllReviews(this.hostId).subscribe(
        (data: ReviewResponse[]) => {
          this.reviews = data;
        }
      );
    }
    

  openDialog(){
    const dialogRef = this.dialog.open(ReportDialogComponent,  {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.report();
      }
    });
  }

  reviewForm=new FormGroup ({
    comment: new FormControl('',Validators.required)
  })

  report(): void {
    this.service.reportHost(this.hostDetails.username).subscribe({
      next:(response:MessageResponse) => {
        this.snackBar.open(response.message, 'Dismiss', {
          duration: 10000,
          panelClass: ['snackbar'],
        });
      }
  });
  }

  createReview(): void {
    const review: ReviewRequest= {
      guestUsername: this.authService.getUsername(),
      reviewedEntity: this.hostDetails.username,
      comment: this.reviewForm.value.comment || '',
      rating: this.rating,
      type: ReviewType.HostReview
    }
    this.service.createReview(review).subscribe({
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

  toggleCommentField() {
    this.showCommentField = !this.showCommentField;
  }

  onClick(rating:number) {
    this.rating = rating;
    this.ratingUpdated.emit(rating);
    return false;
  }

  onDeleteReview(reviewId: string) {

    this.reviews = this.reviews.filter(review => review.id !== reviewId);
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
function next(value: ReviewResponse): void {
  throw new Error('Function not implemented.');
}

