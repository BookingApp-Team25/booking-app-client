import {Component, Input} from '@angular/core';
import {AccommodationSummary} from "../model/accommodation-summary";
import {AccommodationRequestSummary} from "../model/accommodation-request-summary";

@Component({
  selector: 'app-accommodation-request-card',
  templateUrl: './accommodation-request-card.component.html',
  styleUrls: ['./accommodation-request-card.component.css']
})
export class AccommodationRequestCardComponent {
  @Input() summary: AccommodationRequestSummary;
}
