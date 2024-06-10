import { Component } from '@angular/core';
import {AccommodationSummary} from "../../accommodation/model/accommodation-summary";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationSummaryCollection} from "../../accommodation/model/accommodation-summary-collection";
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-host-accommodations-view',
  templateUrl: './host-accommodations-view.component.html',
  styleUrls: ['./host-accommodations-view.component.css']
})
export class HostAccommodationsViewComponent {
  summaries: AccommodationSummary[] = [];
  numberOfElements : number = 10;
  page : number = 0;
  totalNumberOfElements = 0;
  constructor(private service: AccommodationService, private authService: AuthService){}

  fetchAccommodations(){
    this.service.getAllHostAccommodations(this.authService.getUsername(),this.page,this.numberOfElements).subscribe({
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
}
