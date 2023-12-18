import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ays-dialog',
  templateUrl: './ays-dialog.component.html',
  styleUrls: ['./ays-dialog.component.css']
})
export class AysDialogComponent {
  @Input() option: string;
  result: boolean;
  constructor(
    public dialogRef: MatDialogRef<AysDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { option: string }
  ) {
    this.option = data.option;
  }

  onYesClick(): void {
    this.result = true;
    this.dialogRef.close(this.result);
  }
}
