import {AccommodationOnHoldStatus} from "../enum/accommodation-on-hold-status";

export interface AccommodationSummary {
    id?: String;
    name?: String;
    photo?: String;
    description?: String;
    price?: number;
    rating?: number;
    onHoldStatus? : AccommodationOnHoldStatus;
}
