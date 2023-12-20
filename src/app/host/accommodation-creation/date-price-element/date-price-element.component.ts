import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-date-price-element',
  templateUrl: './date-price-element.component.html',
  styleUrls: ['./date-price-element.component.css']
})
export class DatePriceElementComponent {
  @Input() startDate : Date;
  @Input() endDate : Date;
  @Input() weekendPrice : boolean;
  @Input() summerPrice : boolean;
  @Input() holidayPrice : boolean;
  @Input() winterPrice : boolean
}
