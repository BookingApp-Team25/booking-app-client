import {AccommodationMonthlyLog} from "./accommodation-monthly-log";

export interface AccommodationMonthlyLogCollection{
  accommodationId: string;
  accommodationName: string;
  months: AccommodationMonthlyLog[];

}
