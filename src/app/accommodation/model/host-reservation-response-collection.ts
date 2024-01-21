import {HostReservationResponse} from "./host-reservation-response";

export interface HostReservationResponseCollection{
  summaries : HostReservationResponse[];
  totalNumberOfSummaries : number;
}
