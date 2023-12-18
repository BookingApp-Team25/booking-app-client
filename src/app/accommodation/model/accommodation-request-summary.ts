import {AccommodationType} from "../enum/accommodation-type-enum";
import {Location} from "./location";
import {AccommodationPricelist} from "./accommodation-pricelist";
import {AccommodationReservationPolicy} from "../enum/accommodation-reservation-policy-enum";
import {AccommodationDatePeriod} from "./accommodation-date-period";
import {AccommodationUpdateType} from "../enum/accommodation-update-type-enum";
export interface AccommodationRequestSummary {
  id : string;
  accommodationName : string;
  accommodationDescription : string;
  accommodationPhoto : string;
  type : AccommodationUpdateType;
}
