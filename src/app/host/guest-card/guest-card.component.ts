import { Component, Input } from '@angular/core';
import { AccountDetails } from 'src/app/infrastructure/auth/model/account-details';
import { HostService } from '../host.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportDialogComponent } from 'src/app/layout/report-dialog/report-dialog.component';
import { MessageResponse } from 'src/app/infrastructure/auth/model/message-response';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.css']
})
export class GuestCardComponent {
 @Input() guest:AccountDetails;
  constructor(private service:HostService,private dialog:MatDialog,private snackBar:MatSnackBar){}

 openDialog(){
  const dialogRef = this.dialog.open(ReportDialogComponent,  {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result.result) {
      this.service.report(this.guest.username,result.reportReason).subscribe({
        next:(response:MessageResponse) => {
          this.snackBar.open(response.message, 'Dismiss', {
            duration: 5000,
            panelClass: ['snackbar'],
          });
        }
      })
    }
  });
}
}
