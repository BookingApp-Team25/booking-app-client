import {AccommodationType} from "../enum/accommodation-type-enum";
import {Location} from "./location";
import {AccommodationPricelist} from "./accommodation-pricelist";
import {AccommodationReservationPolicy} from "../enum/accommodation-reservation-policy-enum";
import {AccommodationDatePeriod} from "./accommodation-date-period";

export interface AccommodationRequest {
  name: string;
  description: string;
  location: Location;
  amenities: string[];
  photos: string[];
  minGuests: number;
  maxGuests: number;
  type: AccommodationType;
  availability: AccommodationDatePeriod[];
  pricelist: AccommodationPricelist;
  price: number;
  daysBefore: number;
  policy: AccommodationReservationPolicy;
  hostId : string;
  hostUsername:string;
  rating: number;
}
