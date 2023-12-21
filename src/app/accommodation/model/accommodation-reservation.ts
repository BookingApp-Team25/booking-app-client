import { AccommodationDatePeriod } from "./accommodation-date-period";
import { ReservationStatus } from "./reservation-status";

export interface Reservation {
    guestId: string;
    hostId: string;
    accommodationId: string;
    reservationStatus: ReservationStatus;
    reservedDate: AccommodationDatePeriod;
  }
  