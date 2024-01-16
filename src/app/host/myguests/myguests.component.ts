import { Component, OnInit, Output } from '@angular/core';
import { AccountDetails } from 'src/app/infrastructure/auth/model/account-details';
import { HostService } from '../host.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-myguests',
  templateUrl: './myguests.component.html',
  styleUrls: ['./myguests.component.css']
})
export class MyguestsComponent implements OnInit {
  guests:AccountDetails[]=[];

  constructor(private service:HostService,private authService:AuthService){}
  ngOnInit(): void{
    this.service.getMyGuests(this.authService.getUsername()).subscribe(
      (data:AccountDetails[]) => {
        console.log(data);
        this.guests=data;
      }
    );
  }
}
