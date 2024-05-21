import { Component, OnInit } from '@angular/core';
import { AccountDetails } from '../model/account-details';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditAccountRequest } from '../model/edit-account';
import { MessageResponse } from '../model/message-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AysDialogComponent } from 'src/app/layout/ays-dialog/ays-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  account: AccountDetails;
  isInputDisabled=true;
  showDialog=false;
  constructor(private service: AuthService, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {}

  editForm=new FormGroup({
    password: new FormControl('',Validators.minLength(6)),
    repeatPassword: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
})

  toggleInputState() {
    this.isInputDisabled = !this.isInputDisabled;
  }

  ngOnInit(): void {
    this.service.accountDetails().subscribe({
      next: (response: AccountDetails) => {
        console.log("Response:", response)
        this.account = response;
        this.initializeForm();
      }
    });
  }
  private initializeForm(): void {
    this.editForm.setValue({
      password: '',
      repeatPassword: '',
      phone: this.account.phoneNumber,
      firstName: this.account.firstName,
      lastName: this.account.lastName,
      address: this.account.address
    });
  }
  editAccount(): void{
    if(this.editForm.valid){
      const editRequest: EditAccountRequest = {
        password: this.editForm.value.password || '',
        passwordRepeat: this.editForm.value.repeatPassword || '',
        firstName: this.editForm.value.firstName || '',
        lastName: this.editForm.value.lastName || '',
        phoneNumber: this.editForm.value.phone || '',
        address: this.editForm.value.address || ''
      }
      this.service.editAccount(editRequest).subscribe({
        next:(response: MessageResponse) => {
          this.snackBar.open(response.message, 'Dismiss', {
            duration: 5000,
            panelClass: ['snackbar'],
          });
        }
      })
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AysDialogComponent,  {
      width: '300px',
      data: { option: 'Delete account' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccount();
      }
    });
  }

  deleteAccount(): void {
    this.service.deleteAccount().subscribe({
      next:(response: MessageResponse) => {
        if(response.successful){
          localStorage.removeItem('user');
          this.service.setUser();
          this.router.navigate(['home'])
        } else {
          this.snackBar.open(response.message, 'Dismiss', {
            duration: 5000,
            panelClass: ['snackbar'],
          });
        }
      }
    })
  }

  toggleDialog(){
    this.showDialog=!this.showDialog;
  }
}
