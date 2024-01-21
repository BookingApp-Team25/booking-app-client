import { Component, Input } from '@angular/core';
import { UserReportData } from '../user-report-data';
import { UserData } from '../user-data';
import { AccommodationService } from '../../../accommodation/accommodation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() summary: UserReportData;
  user: UserData = {
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  constructor(private service: AccommodationService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.user.id = this.summary.userId;
    console.log("UserID", this.user.id);

    this.service.getUserById(this.summary.userId).subscribe({
      next: (data: UserData) => {
        this.user = data;
        console.log("User data:", this.user);
      },
      error: (_) => {
        console.log("Error loading user");
      }
    });
  }
  blockUser(): void {
    this.service.blockUser(this.user.id).subscribe({
      next: (isBlocked: Boolean) => {
        if (isBlocked) {
          console.log("User blocked successfully");
          this.openSnackBar("User blocked successfully!");
        } else {
          console.log("Error blocking user");
          this.openSnackBar("Error blocking user.");
        }
      },
      error: (_) => {
        console.log("Error blocking user");
      }
    });
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
