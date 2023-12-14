import { Component, EventEmitter, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
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
}
