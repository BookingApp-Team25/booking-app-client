import { Component } from '@angular/core';
import {Reservation} from "../../accommodation/model/accommodation-reservation";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {ReservationCollection} from "../../accommodation/model/accommodation-reservation-collection";
import {HostReservationResponse} from "../../accommodation/model/host-reservation-response";
import {HostReservationResponseCollection} from "../../accommodation/model/host-reservation-response-collection";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {HostReservationSummaryCollection} from "../model/host-reservation-summary-Collection";

@Component({
  selector: 'app-host-resolve-reservation-view',
  templateUrl: './host-resolve-reservation-view.component.html',
  styleUrls: ['./host-resolve-reservation-view.component.css']
})
export class HostResolveReservationViewComponent {
  reservations: HostReservationSummaryCollection;
  numberOfElements : number = 10;
  page : number = 0;
  totalNumberOfElements = 0;
  constructor(private service: AccommodationService, private authService : AuthService){}
  fetchReservations(){
    this.service.getAllUnresolvedHostReservations("5894d69d-fc8d-4f06-bf0c-dc695b40901b",this.page,this.numberOfElements).subscribe({
      next:(data: HostReservationSummaryCollection)=> {
        this.reservations = data;
        console.log(data);
        this.totalNumberOfElements = data.totalNumberOfElements;
      },
      error: (_) => {console.log("Error loading summaries")}
    })
  }
  ngOnInit(): void {
    this.fetchReservations()
  }
  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.numberOfElements = event.pageSize;
    this.fetchReservations();
  }
}
