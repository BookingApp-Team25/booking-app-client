import {AccommodationOnHoldStatus} from "../enum/accommodation-on-hold-status";

export interface AccommodationSummary {
    accommodationId?: String;
    name?: String;
    photo?: String;
    description?: String;
    price?: number;
    rating?: number;
    onHoldStatus? : AccommodationOnHoldStatus;
}
