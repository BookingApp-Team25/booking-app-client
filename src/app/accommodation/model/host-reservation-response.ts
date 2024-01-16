import {ReservationStatus} from "./reservation-status";
import {DatePeriod} from "./date-period";

export interface HostReservationResponse {
  reservationId: string;
  guestName: string;
  accommodationId: string;
  accommodationName: string;
  reservationStatus: ReservationStatus;
  reservedDate: DatePeriod;
  price: number;
}
