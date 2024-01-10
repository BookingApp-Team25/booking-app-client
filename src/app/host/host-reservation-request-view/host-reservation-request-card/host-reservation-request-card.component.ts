import {Component, Input} from '@angular/core';
import {Reservation} from "../../../accommodation/model/accommodation-reservation";

@Component({
  selector: 'app-host-reservation-request-card',
  templateUrl: './host-reservation-request-card.component.html',
  styleUrls: ['./host-reservation-request-card.component.css']
})
export class HostReservationRequestCardComponent {
  @Input() reservation : Reservation;
}
