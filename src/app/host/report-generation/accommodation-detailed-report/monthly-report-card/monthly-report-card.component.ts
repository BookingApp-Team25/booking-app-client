import {Component, Input} from '@angular/core';
import {AccommodationMonthlyLog} from "../../../model/accommodation-monthly-log";

@Component({
  selector: 'app-monthly-report-card',
  templateUrl: './monthly-report-card.component.html',
  styleUrls: ['./monthly-report-card.component.css']
})
export class MonthlyReportCardComponent {
  @Input() monthlyLog: AccommodationMonthlyLog;
}
