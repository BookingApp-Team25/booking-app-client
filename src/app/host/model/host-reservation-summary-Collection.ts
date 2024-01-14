import {HostReservationSummary} from "./host-reservation-summary";

export interface HostReservationSummaryCollection{
  hostReservationResponses: HostReservationSummary[];
  totalNumberOfElements: number;
}
