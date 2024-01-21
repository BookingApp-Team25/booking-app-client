import { DatePeriod } from "./date-period";
import { ReservationStatus } from "./reservation-status";

export interface Reservation {
    guestId: string;
    guestName: string;
    hostId: string;
    accommodationId: string;
    accommodationName: string;
    reservationStatus: ReservationStatus;
    reservedDate: DatePeriod;
    price: number;
  }
