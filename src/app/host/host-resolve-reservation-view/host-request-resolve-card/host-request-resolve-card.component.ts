import {Component, Input} from '@angular/core';
import {Reservation} from "../../../accommodation/model/accommodation-reservation";
import {AccommodationService} from "../../../accommodation/accommodation.service";
import {HostReservationResponse} from "../../../accommodation/model/host-reservation-response";
import {HostReservationSummary} from "../../model/host-reservation-summary";

@Component({
  selector: 'app-host-request-resolve-card',
  templateUrl: './host-request-resolve-card.component.html',
  styleUrls: ['./host-request-resolve-card.component.css']
})
export class HostRequestResolveCardComponent {
  @Input() reservation : HostReservationSummary;
  constructor(private service: AccommodationService){}
  acceptReservation(){
    this.service.resolveReservationRequest(this.reservation.reservationId,true).subscribe(
      (response) => {
        console.log('POST request successful', response);
        alert("New accommodation request created, waiting for approval");
      },
      (error) => {
        console.error('Error making POST request', error);
        // Handle the error
      }
    )
  }
  rejectReservation() {
    this.service.resolveReservationRequest(this.reservation.reservationId,false).subscribe(
      (response) => {
        console.log('POST request successful', response);
        alert("New accommodation request created, waiting for approval");
      },
      (error) => {
        console.error('Error making POST request', error);
        // Handle the error
      }
    )

  }
}
