import {Component, Input} from '@angular/core';
import {AccommodationSummary} from "../model/accommodation-summary";

@Component({
  selector: 'app-accommodation-host-card',
  templateUrl: './accommodation-host-card.component.html',
  styleUrls: ['./accommodation-host-card.component.css']
})
export class AccommodationHostCardComponent {
  @Input() summary: AccommodationSummary;

}
