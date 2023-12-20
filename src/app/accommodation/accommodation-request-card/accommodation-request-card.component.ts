import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {AccommodationSummary} from "../model/accommodation-summary";
import {AccommodationRequestSummary} from "../model/accommodation-request-summary";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-accommodation-request-card',
  templateUrl: './accommodation-request-card.component.html',
  styleUrls: ['./accommodation-request-card.component.css']
})
export class AccommodationRequestCardComponent implements OnInit{
  @Input() summary: AccommodationRequestSummary;
  isRequestSolved : boolean = false;
  constructor(public service: AccommodationService) {
  }

  ngOnInit(): void {
  console.log(this.summary.accommodationDescription)
    console.log(this.summary.accommodationName)

  }
  onResolveAccommodationUpdate(id: string, flag: number): void {
    this.service.resolveAccommodationRequest(id, flag).subscribe(
      (response: any) => {
        console.log('Success:', response);
        // Handle the successful response as needed
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle the error appropriately
      }
    );
    this.isRequestSolved = true
  }
}
