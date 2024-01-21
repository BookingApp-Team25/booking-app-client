// src/app/popup.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private closeLoginPopupSource = new Subject<void>();
  closeLoginPopup$ = this.closeLoginPopupSource.asObservable();
  isLoginVisible = false;

  toggleLoginVisibility() {
    this.isLoginVisible = !this.isLoginVisible;
    this.closeLoginPopupSource.next();
  }
}
