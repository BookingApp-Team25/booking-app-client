import { Component } from '@angular/core';
import {AccommodationSummary} from "../../accommodation/model/accommodation-summary";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationRequest} from "../../accommodation/model/accommodation-request";
import {AccommodationRequestSummary} from "../../accommodation/model/accommodation-request-summary";

@Component({
  selector: 'app-accommodation-requests',
  templateUrl: './accommodation-requests.component.html',
  styleUrls: ['./accommodation-requests.component.css']
})
export class AccommodationRequestsComponent {
  summaries: AccommodationRequestSummary[]
  constructor(private service: AccommodationService){}
  ngOnInit(): void {
    this.service.getAllUpdates().subscribe({
      next:(data: AccommodationRequestSummary[])=> {
        this.summaries=data;
      },
      error: (_) => {console.log("Error loading summaries")}
    })
  }
}
