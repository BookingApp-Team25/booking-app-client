// src/app/layout/login/login.component.ts
import { Component } from '@angular/core';
import { PopupService } from '../../services/popup/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private popupService: PopupService) {}

  navigateToRegistration() {
    // toggle the login visibility
    this.popupService.toggleLoginVisibility();

    // navigate to the registration page if needed
    // this.router.navigate(['/registration']);
  }
}
