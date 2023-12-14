import { Component, OnInit } from '@angular/core';
import { AccountDetails } from '../model/account-details';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  account: AccountDetails;
  isInputDisabled=true;
  constructor(private service: AuthService) {}

  toggleInputState() {
    this.isInputDisabled = !this.isInputDisabled;
  }

  ngOnInit(): void {
    this.service.accountDetails().subscribe({
      next: (response: AccountDetails) => {
        this.account = response;
        console.log(this.account);
      }
    });
  }
}
