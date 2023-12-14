import {AccommodationUpdateType} from "./accommodation-update-type-enum";


export interface AccommodationRequestSummary{
  accommodationName : string;
  accommodationDescription : string;
  accommodationPhoto : string;
  type : AccommodationUpdateType;
}
