import { Component, OnInit } from '@angular/core';
import { AccommodationModule } from 'src/app/accommodation/accommodation.module';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { AccommodationSummary } from 'src/app/accommodation/model/accommodation-summary';
import {AccommodationSummaryCollection} from "../../accommodation/model/accommodation-summary-collection";

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
  constructor(private service: AccommodationService){}

  fetchAccommodations(){
    this.service.getAllApprovedAccommodations(this.page,this.numberOfElements).subscribe({
      next:(data: AccommodationSummaryCollection)=> {
        this.summaries = []
        console.log(data);
        data.summaries.forEach(obj => {
          console.log(obj);
          this.summaries.push(obj);
        });
        this.totalNumberOfElements = data.totalNumberOfSummaries;
      },
      error: (_) => {console.log("Error loading summaries")}
    })
  }
  ngOnInit(): void {
    this.fetchAccommodations()
  }
  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.numberOfElements = event.pageSize;
    this.fetchAccommodations();
  }

  // Event handler for page size change

}
