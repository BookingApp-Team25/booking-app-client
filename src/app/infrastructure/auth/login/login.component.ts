import { Component, EventEmitter, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isPopupVisible = true;
  closePopup(): void {
    this.isPopupVisible = false;
  }

  constructor(private authService:AuthService){}

  loginForm=new FormGroup({
    username: new FormControl("",Validators.email),
    password: new FormControl("",Validators.minLength(5))
  })

  login(): void {
    if(this.loginForm.valid){
      const LoginRequest: LoginRequest = {
        username: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(LoginRequest).subscribe({
        next:(response:LoginResponse) => {
          localStorage.setItem('user',response.jwt);
          this.authService.setUser()
          this.isPopupVisible=false;
        }
      })
    }
  }
}
