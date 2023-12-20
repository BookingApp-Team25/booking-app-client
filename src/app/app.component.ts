// src/app/app.component.ts
import {Component, ViewChild} from '@angular/core';
import { PopupService } from './services/popup/popup.service';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'BookingApp';

  constructor(public popupService: PopupService) {}

  toggleLogin() {
    this.popupService.toggleLoginVisibility();
  }
  toggleSidebar() {
    this.sidenav.toggle();
  }
}
