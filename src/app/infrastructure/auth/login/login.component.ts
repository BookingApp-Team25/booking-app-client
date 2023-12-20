import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  closePopup(): void {
    this.dialogRef.close();
  }

  constructor(private authService:AuthService,private snackbar:MatSnackBar,public dialogRef: MatDialogRef<LoginComponent>){}

  loginForm=new FormGroup({
    username: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",Validators.required)
  })

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        username: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      };
  
      this.authService.login(loginRequest).subscribe({
        next: (response: LoginResponse) => {
          if (response.jwt === "") {
            this.snackbar.open("You need to activate your account", 'Dismiss', {
              duration: 10000,
              panelClass: ['snackbar'],
            });
          } else {
            localStorage.setItem('user', response.jwt);
            this.authService.setUser();
            this.closePopup();
          }
        },
        error: (err) => {
          if (err.status === 403) {
            this.snackbar.open("Username and password don't match", 'Dismiss', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        }
      });
    }
  }
}
