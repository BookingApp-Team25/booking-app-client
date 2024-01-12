import { Component, OnInit } from '@angular/core';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { AccommodationSummary } from 'src/app/accommodation/model/accommodation-summary';
import {AccommodationSummaryCollection} from "../../accommodation/model/accommodation-summary-collection";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  summaries: AccommodationSummary[] = [];
  numberOfElements : number = 10;
  page : number = 0;
  totalNumberOfElements = 0;
  private subscription: Subscription;

  constructor(private service: AccommodationService){}
  
  fetchAccommodations() {
    this.service.getAllApprovedAccommodations(this.page, this.numberOfElements).subscribe({
      next: (data: AccommodationSummaryCollection) => {
        this.summaries = data.summaries;
        this.totalNumberOfElements = data.totalNumberOfSummaries;
      },
      error: (_) => {
        console.log("Error loading summaries");
      }
    });
  }
  
  ngOnInit(): void {
    this.fetchAccommodations();
    this.subscription = this.service.filteredAccommodations$.subscribe({
      next: (accommodations) => {
        this.summaries = accommodations;
      },
      error: (_) => {
        console.log("Error loading filtered accommodations");
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // to prevent memory leaks
  }
  
  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.numberOfElements = event.pageSize;
    this.fetchAccommodations();
  }
}
