import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output() accountButtonClick = new EventEmitter<void>();
  onAccountButtonClick() {
    this.accountButtonClick.emit();
  }
}
