import { Component } from '@angular/core';
import { UserReportData } from './user-report-data';
import { AccommodationService } from '../../accommodation/accommodation.service';

@Component({
  selector: 'app-user-blocking',
  templateUrl: './user-blocking.component.html',
  styleUrls: ['./user-blocking.component.css']
})
export class UserBlockingComponent {
  summaries: UserReportData[];
  constructor(private service: AccommodationService){}
  ngOnInit(): void {
    this.service.getAllUserReports().subscribe({
      next:(data: UserReportData[])=> {
        this.summaries=data;
      },
      error: (_) => {console.log("Error loading users")}
    })
  }
}
