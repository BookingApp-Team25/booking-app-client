import {AccommodationType} from "../enum/accommodation-type-enum";
import {Location} from "./location";
import {AccommodationPricelist} from "./accommodation-pricelist";
import {AccommodationReservationPolicy} from "../enum/accommodation-reservation-policy-enum";
import {DatePeriod} from "./date-period";
import {PriceCalculationMethod} from "../enum/price-calculation-method";

export interface AccommodationRequest {
  hostId : string;
  name: string;
  description: string;
  location: Location;
  amenities: string[];
  photos: string[];
  minGuests: number;
  maxGuests: number;
  type: AccommodationType;
  availability: DatePeriod[];
  pricelist: AccommodationPricelist;
  price: number;
  daysBefore: number;
  policy: AccommodationReservationPolicy;
  priceCalculationMethod : PriceCalculationMethod;
}
