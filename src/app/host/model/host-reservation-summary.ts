import {AccommodationReservationPolicy} from "../../accommodation/enum/accommodation-reservation-policy-enum";

export interface HostReservationSummary{
  guestName? : String,
  accommodationName? : String,
  accommodationPhoto? : String,
  reservationId? : String,
  accommodationReservationPolicy? : AccommodationReservationPolicy
}
