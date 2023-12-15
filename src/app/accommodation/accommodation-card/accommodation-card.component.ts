import { Component, Input } from '@angular/core';
import { AccommodationSummary } from '../model/accommodation-summary';
import {AccommodationRequestSummary} from "../model/accommodation-request-summary";

@Component({
  selector: 'accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  @Input() summary: AccommodationSummary;
}
