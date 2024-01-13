import {AccommodationReservationPolicy} from "../../accommodation/enum/accommodation-reservation-policy-enum";
import {ReservationStatus} from "../../accommodation/model/reservation-status";
import {DatePeriod} from "../../accommodation/model/date-period";

export interface HostReservationSummary{
  reservationId: string;
  guestName: string;
  accommodationId: string;
  accommodationName: string;
  accommodationPhoto: string;
  reservationStatus: ReservationStatus;
  reservedDate: DatePeriod;
  price: number;
}
