import { Component } from '@angular/core';
import {AccommodationService} from "../../accommodation/accommodation.service";

@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css']
})
export class ReportGenerationComponent {
  constructor(private service: AccommodationService){}
}
