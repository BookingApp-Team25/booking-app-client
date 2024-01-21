import { Component } from '@angular/core';
import { AccommodationService } from '../../accommodation/accommodation.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AccommodationSummary } from '../../accommodation/model/accommodation-summary';
import { Guest } from '../../accommodation/model/guest-data';

@Component({
  selector: 'app-favourite-accommodation',
  templateUrl: './favourite-accommodation.component.html',
  styleUrls: ['./favourite-accommodation.component.css']
})
export class FavouriteAccommodationComponent {
  summaries: AccommodationSummary[];
  guest: Guest;

  constructor(private service: AccommodationService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.getGuestData(this.authService.getUsername());
    this.authService.getUsername();

    this.service.getFavouriteAccommodations(this.guest.id).subscribe({
      next: (data: AccommodationSummary[]) => {
        this.summaries = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error loading favorite accommodations:', error);
      }
    });    
  }

  async getGuestData(username: string): Promise<void> {
    console.log("Before service call");
    return new Promise<void>((resolve) => {
      this.service.getGuestByUsername(username).subscribe({
        next: (data: Guest) => {
          console.log("Service call successful. Data:", data);
          this.guest = data;
          resolve();
        },
        error: (error) => {
          console.error("Error in service call:", error);
          resolve(); // Resolve even in case of an error to avoid blocking subsequent code
        }
      });
    });
  }
}
