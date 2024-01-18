import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationSummary } from '../model/accommodation-summary';
import { AccommodationService } from '../accommodation.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Guest } from '../model/guest-data';

@Component({
  selector: 'accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent implements OnInit {
  @Input() summary: AccommodationSummary;

  isFavorite: Boolean = false;
  guest: Guest;

  constructor(
    private service: AccommodationService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getGuestData(this.authService.getUsername());
    console.log("Accommodaiton data:", this.summary);
    console.log("Guest data:", this.guest);
  
    this.checkIfFavorite();
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
  
  // Favorites logic
  addToFavorites() {
    if (this.summary?.accommodationId) {
      this.service.addFavoriteAccommodation(this.guest.id, this.summary.accommodationId)
        .subscribe(response => {
          if (response) {
            this.isFavorite = true;
            this.showSnackBar('Added to favorites');
          }
        });
    }
  }

  removeFromFavorites() {
    if (this.summary?.accommodationId) {
      this.service.removeFavoriteAccommodation(this.guest.id, this.summary.accommodationId)
        .subscribe(response => {
          if (response) {
            this.isFavorite = false;
            this.showSnackBar('Removed from favorites');
          }
        });
    }
  }

  checkIfFavorite() {
    if (this.summary?.accommodationId) {
      this.service.isFavoriteAccommodation(this.guest.id, this.summary.accommodationId)
        .subscribe(response => {
          this.isFavorite = response;
          console.log("isFaovourite:", this.isFavorite);
        });
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
