import { Component, OnInit } from '@angular/core';
import { AccommodationModule } from 'src/app/accommodation/accommodation.module';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { AccommodationSummary } from 'src/app/accommodation/model/accommodation-summary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  summaries: AccommodationSummary[]
  constructor(private service: AccommodationService){}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next:(data: AccommodationSummary[])=> {
        this.summaries=data;
      },
      error: (_) => {console.log("Error loading summaries")}
    })
  }
}
