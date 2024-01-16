import { Component } from '@angular/core';
import {AccommodationSummary} from "../../accommodation/model/accommodation-summary";
import {Reservation} from "../../accommodation/model/accommodation-reservation";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationSummaryCollection} from "../../accommodation/model/accommodation-summary-collection";
import {ReservationCollection} from "../../accommodation/model/accommodation-reservation-collection";
import {HostReservationSummary} from "../model/host-reservation-summary";
import {HostReservationSummaryCollection} from "../model/host-reservation-summary-Collection";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-host-reservation-request-view',
  templateUrl: './host-reservation-request-view.component.html',
  styleUrls: ['./host-reservation-request-view.component.css']
})
export class HostReservationRequestViewComponent {
  filterForm : FormGroup;
  reservations: HostReservationSummaryCollection;
  numberOfElements : number = 10;
  page : number = 0;
  totalNumberOfElements = 0;
  constructor(private service: AccommodationService, private fb: FormBuilder){}
  fetchReservations(){
    this.service.getAllHostReservations("5894d69d-fc8d-4f06-bf0c-dc695b40901b",this.page,this.numberOfElements).subscribe({
      next:(data: HostReservationSummaryCollection)=> {
        this.reservations = data;
        console.log(data);
        this.totalNumberOfElements = data.totalNumberOfElements;
      },
      error: (_) => {console.log("Error loading summaries")}
    })
  }
  fetchReservationsFiltered() {
    console.log(this.filterForm.get('startDate')?.value);
    this.service.getAllHostReservationsFiltered("5894d69d-fc8d-4f06-bf0c-dc695b40901b",
        this.filterForm.get('startDate')?.value,
        this.filterForm.get('endDate')?.value,
        this.filterForm.get("accommodationName")?.value,
        this.filterForm.get('reservationStatus')?.value,
        this.page,this.numberOfElements).subscribe({
      next:(data: HostReservationSummaryCollection)=> {
        this.reservations = data;
        console.log(data);
        this.totalNumberOfElements = data.totalNumberOfElements;
      },
      error: (_) => {console.log("Error loading summaries")}
    })
  }
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      startDate: ['',Validators.required],
      endDate: ['',Validators.required],
      accommodationName: ['',Validators.required],
      reservationStatus: ['ACCEPTED', Validators.required]
    });
    this.fetchReservations()
  }
  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.numberOfElements = event.pageSize;
    this.fetchReservations();
  }
}
