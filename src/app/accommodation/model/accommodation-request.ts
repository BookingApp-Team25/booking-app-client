import {AccommodationType} from "./accommodation-type-enum";
import {AccommodationReservedDates} from "./AccommodationReservedDates";
import {Location} from "./location";
import {AccommodationPricelist} from "./accommodation-pricelist";
import {AccommodationReservationPolicy} from "./accommodation-reservation-policy-enum";

export interface AccommodationRequest {
  name: string;
  description: string;
  location: Location;
  amenities: string[];
  photos: string[];
  minGuests: number;
  maxGuests: number;
  type: AccommodationType;
  availability: AccommodationReservedDates;
  pricelist: AccommodationPricelist;
  price: number;
  daysBefore: number;
  policy: AccommodationReservationPolicy;
}
