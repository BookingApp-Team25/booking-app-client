import { Component } from '@angular/core';
import {AccommodationSummary} from "../../accommodation/model/accommodation-summary";
import {Reservation} from "../../accommodation/model/accommodation-reservation";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationSummaryCollection} from "../../accommodation/model/accommodation-summary-collection";
import {ReservationCollection} from "../../accommodation/model/accommodation-reservation-collection";

@Component({
  selector: 'app-host-reservation-request-view',
  templateUrl: './host-reservation-request-view.component.html',
  styleUrls: ['./host-reservation-request-view.component.css']
})
export class HostReservationRequestViewComponent {
  reservations: Reservation[] = [];
  numberOfElements : number = 10;
  page : number = 0;
  totalNumberOfElements = 0;
  constructor(private service: AccommodationService){}
  fetchReservations(){
    this.service.getAllHostReservations("5894d69d-fc8d-4f06-bf0c-dc695b40901b",this.page,this.numberOfElements).subscribe({
      next:(data: ReservationCollection)=> {
        this.reservations = []
        console.log(data);
        data.hostReservationResponses.forEach(obj => {
          console.log(obj);
          this.reservations.push(obj);
        });
        this.totalNumberOfElements = data.totalNumberOfReservations;
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
