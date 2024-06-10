import { DatePeriod } from "./date-period";
import { ReservationStatus } from "./reservation-status";

export interface Reservation {
    guestUsername: string;
    hostUsername: string;
    accommodationId: string;
    accommodationName: string;
    reservationStatus: ReservationStatus;
    reservedDate: DatePeriod;
    price: number;
  }
