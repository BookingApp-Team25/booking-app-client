import {Component, Input} from '@angular/core';
import {AccomomdationLog} from "../../model/accomomdation-log";

@Component({
  selector: 'app-accommodation-report-card',
  templateUrl: './accommodation-report-card.component.html',
  styleUrls: ['./accommodation-report-card.component.css']
})
export class AccommodationReportCardComponent {
  @Input() log: AccomomdationLog;
}
