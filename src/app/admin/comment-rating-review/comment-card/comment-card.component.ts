import { Component, Input } from '@angular/core';
import { ReviewResponse } from '../../../accommodation/model/review-response';
import { AccommodationService } from '../../../accommodation/accommodation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewType } from '../../../accommodation/enum/reviewtype';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() summary: ReviewResponse;

  constructor(public service: AccommodationService,
    private snackBar: MatSnackBar,
    ) {}

  deleteComment(){
    let flagValue: boolean;

    console.log(this.summary.type);
    
    if (this.summary.type.toString() === "AccommodationReview") {
      console.log("usao");
      
      flagValue = true;
    } else {
      flagValue = false;
    }
    console.log("falg value: ", flagValue);

    this.service.deleteReview(this.summary.id, flagValue).subscribe({
      next:(response:Boolean) => {
        if (response){
          console.log("deleted review with ID:", this.summary.id);
          this.openSnackBar("deleted review with ID: " + this.summary.id);
        }
        else {
          console.log("Error deleting:", this.summary.id);
          this.openSnackBar("Error deleting: " + this.summary.id);
        }
      }
    })
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
