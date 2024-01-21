import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { RegistrationRequest, Role } from '../model/registration-request';
import { AuthService } from '../auth.service';
import { MessageResponse } from '../model/message-response';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private authService:AuthService, private router: Router, private snackbar:MatSnackBar){}
  roles = [
    { label: 'Host', value: Role.Host },
    { label: 'Guest', value: Role.Guest }
    ];

  registrationForm=new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.pattern('^[0-9]*$')]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      role: new FormControl(Role.Guest)
  })
  
  register(): void {
    if(this.registrationForm.value.password==this.registrationForm.value.repeatPassword){
    if (this.registrationForm.valid ) {
      const registrationRequest: RegistrationRequest = {
        username: this.registrationForm.value.email || '',
        password: this.registrationForm.value.password || '',
        passwordRepeat: this.registrationForm.value.repeatPassword || '',
        firstName: this.registrationForm.value.firstName || '',
        lastName: this.registrationForm.value.lastName || '',
        phoneNumber: this.registrationForm.value.phone || '',
        address: this.registrationForm.value.address || '',
        role: this.registrationForm.value.role || Role.Guest
      }
      this.authService.register(registrationRequest).subscribe({
        next:(response:MessageResponse) => {
          if(response.successful){
            this.snackbar.open(response.message, 'Dismiss', {
              duration: 10000,
              panelClass: ['snackbar'],
            });
            //this.router.navigate(['home']);
          } else {
            this.snackbar.open(response.message, 'Dismiss', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        }
      })
    }
  } else {
    this.snackbar.open("Entered passwords don't match", 'Dismiss', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }
}
}
