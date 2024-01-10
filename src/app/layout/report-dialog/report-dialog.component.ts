import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent {
  result: boolean;

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>
  ) {}

  onCancelClick(): void {
    this.result=false;
    this.dialogRef.close(this.result);
  }

  onOkClick(): void {
    this.result = true;
    this.dialogRef.close(this.result);
  }
}
