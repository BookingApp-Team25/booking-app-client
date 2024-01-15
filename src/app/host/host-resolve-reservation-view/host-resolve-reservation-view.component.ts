import { Component } from '@angular/core';
import {Reservation} from "../../accommodation/model/accommodation-reservation";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {ReservationCollection} from "../../accommodation/model/accommodation-reservation-collection";
import {HostReservationResponse} from "../../accommodation/model/host-reservation-response";
import {HostReservationResponseCollection} from "../../accommodation/model/host-reservation-response-collection";

@Component({
  selector: 'app-host-resolve-reservation-view',
  templateUrl: './host-resolve-reservation-view.component.html',
  styleUrls: ['./host-resolve-reservation-view.component.css']
})
export class HostResolveReservationViewComponent {
  reservations: HostReservationResponse[] = [];
  numberOfElements : number = 10;
  page : number = 0;
  totalNumberOfElements = 0;
  constructor(private service: AccommodationService){}
  fetchReservations(){
    this.service.getAllUnresolvedHostReservations("5894d69d-fc8d-4f06-bf0c-dc695b40901b",this.page,this.numberOfElements).subscribe({
      next:(data: HostReservationResponseCollection)=> {
        this.reservations = []
        console.log(data);
        data.summaries.forEach(obj => {
          console.log(obj);
          this.reservations.push(obj);
        });
        this.totalNumberOfElements = data.totalNumberOfSummaries;
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
