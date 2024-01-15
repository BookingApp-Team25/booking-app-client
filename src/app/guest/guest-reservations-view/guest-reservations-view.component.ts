import { Component } from '@angular/core';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { HostReservationResponse } from 'src/app/accommodation/model/host-reservation-response';
import { HostReservationResponseCollection } from 'src/app/accommodation/model/host-reservation-response-collection';

@Component({
  selector: 'app-guest-reservations-view',
  templateUrl: './guest-reservations-view.component.html',
  styleUrls: ['./guest-reservations-view.component.css']
})
export class GuestReservationsViewComponent {
  requests: HostReservationResponse[] = [];
  numberOfElements : number = 10;
  page : number = 0;
  totalNumberOfElements = 0;

  constructor(private service: AccommodationService){}

  fetchReservations() {
    // change this to use the correct guestId
    this.service.getAllGuestReservations('123e4567-e89b-12d3-a456-426614174001', this.page, this.numberOfElements).subscribe({
      next:(data: HostReservationResponseCollection)=> {
        this.requests = []
        console.log("Reservations list data: ", data);
        console.log(data)
        data.summaries.forEach(obj => {
          console.log("Object: ", obj);
          this.requests.push(obj);
        });
        this.totalNumberOfElements = data.totalNumberOfSummaries;
      },
      error: (_) => {console.log("Error loading summaries")
      }
    });
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
