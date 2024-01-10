import {Reservation} from "./accommodation-reservation";

export interface ReservationCollection {
  hostReservationResponses : Reservation[];
  totalNumberOfReservations : number;
}
