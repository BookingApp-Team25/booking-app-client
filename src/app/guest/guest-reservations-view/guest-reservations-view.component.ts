import { Component } from '@angular/core';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { HostReservationResponse } from 'src/app/accommodation/model/host-reservation-response';
import { HostReservationResponseCollection } from 'src/app/accommodation/model/host-reservation-response-collection';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-guest-reservations-view',
  templateUrl: './guest-reservations-view.component.html',
  styleUrls: ['./guest-reservations-view.component.css']
})
export class GuestReservationsViewComponent {
  requests: HostReservationResponse[] = [];
  numberOfElements : number = 10;
  page : number = 0;
  totalNumberOfElements = 0;

  filterForm : FormGroup;

  constructor(private service: AccommodationService, private authService: AuthService, private fb: FormBuilder){}

  async getGuestId(): Promise<string> {
    try {
      const result = await this.service.getGuestByUsername(this.authService.getUsername()).toPromise();
  
      // Use nullish coalescing operator to provide a default value
      return result?.id ?? "defaultGuestId";
    } catch (error) {
      // Throw the error or log it, depending on your error handling strategy
      console.error('Error fetching guest id:', error);
      // Rethrow the error or return a default value
      throw error;
    }
  }

  async fetchReservations() {
    const guestId = await this.getGuestId();
    // change this to use the correct guestId '123e4567-e89b-12d3-a456-426614174001'
    this.service.getAllGuestReservations(guestId, this.page, this.numberOfElements).subscribe({
      next:(data: HostReservationResponseCollection)=> {
        this.requests = []
        console.log("Reservations list data: ", data);
        console.log(data)
        data.summaries.forEach(obj => {
          console.log("Object: ", obj);
          this.requests.push(obj);
        });
        this.totalNumberOfElements = data.totalNumberOfSummaries;
      },
      error: (_) => {console.log("Error loading summaries")
      }
    });
  }

  async fetchReservationsFiltered() {
    this.requests = []
    const guestId = await this.getGuestId();
    //console.log(this.filterForm.get('startDate')?.value);
    this.service.getAllGuestReservationsFiltered(guestId, //'123e4567-e89b-12d3-a456-426614174001'
        this.filterForm.get('startDate')?.value,
        this.filterForm.get('endDate')?.value,
        this.filterForm.get("accommodationName")?.value,
        this.filterForm.get('reservationStatus')?.value,
        this.page,this.numberOfElements).subscribe({
      next:(data: HostReservationResponseCollection)=> {
        data.summaries.forEach(obj => {
          //console.log("Object: ", obj);
          this.requests.push(obj);
        });
        console.log(data);
        this.totalNumberOfElements = data.totalNumberOfSummaries;
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
