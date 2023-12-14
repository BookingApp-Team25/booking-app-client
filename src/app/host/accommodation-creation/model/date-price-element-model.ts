import {DatePair} from "./date-pair";

export interface DatePriceElementModel {
  startDate : Date,
  endDate : Date
  weekendPrice: boolean,
  summerPrice: boolean,
  holidayPrice: boolean,
  winterPrice: boolean,
}
