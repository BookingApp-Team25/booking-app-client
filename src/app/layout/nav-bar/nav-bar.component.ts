import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PopupService } from '../../services/popup/popup.service';
import { map, startWith, Observable } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { FilterDialogComponent } from "../filter-dialog/filter-dialog.component";
import { SearchCriteria } from 'src/app/accommodation/model/SearchCriteria';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  // Add a formGroup property
  searchForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private popupService: PopupService,
    private accommodationService: AccommodationService,
    private fb: FormBuilder, // Inject FormBuilder
  ) {}

  myControl = new FormControl('');
  options: string[] = ['Ankara', 'Arad', 'Belgrade', 'Bucharest', 'Budapest', 'Cologne', 'Dresden', 'Duisburg', 'Durres'];
  filteredOptions: Observable<string[]>;

  filterContents: string[] = [];
  filterType: string = '';
  filterMinPrice: number = 0;
  filterMaxPrice: number = 0;

  ngOnInit() {
    // Create the form group and add the FormControl to it
    this.searchForm = this.fb.group({
      myControl: this.myControl, // Add your other form controls here if needed
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  openDialog(): void {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const topPercentage = 8; // adjust as needed
    const leftPercentage = 50; // adjust as needed
    const topValue = (viewportHeight * topPercentage) / 100 + 'px';
    const leftValue = (viewportWidth * leftPercentage) / 100 + 'px';

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '500px',
      height: '300px',
      hasBackdrop: true,
      disableClose: false
    });

    dialogRef.componentInstance.filterValues.subscribe((values) => {
      // Handle the emitted filter values here
      console.log('Filter Values:', values);
      // Set the filter values to the corresponding properties in NavBarComponent
      this.filterContents = values.contents;
      this.filterType = values.type;
      this.filterMinPrice = values.minPrice;
      this.filterMaxPrice = values.maxPrice;
    });

    dialogRef.updatePosition({ top: topValue, left: leftValue });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onAccountButtonClick() {
    this.popupService.toggleLoginVisibility();
  }

  @ViewChild('guestsInput') guestsInput: ElementRef<HTMLInputElement>;
  @ViewChild('startDateInput') startDateInput: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput') endDateInput: ElementRef<HTMLInputElement>;

  handleSearch() {
    const startDate = this.startDateInput.nativeElement.value ? new Date(this.startDateInput.nativeElement.value) : null;
    const endDate = this.endDateInput.nativeElement.value ? new Date(this.endDateInput.nativeElement.value) : null;

    const searchCriteria: SearchCriteria = {
      location: this.myControl.value,
      numberOfGuests: +this.guestsInput.nativeElement.value,
      dateStart: startDate,
      dateEnd: endDate,
      contents: this.filterContents,
      type: this.filterType,
      minPrice: this.filterMinPrice,
      maxPrice: this.filterMaxPrice
    };

    const hasFilters =
      (searchCriteria.contents && searchCriteria.contents.length > 0) ||
      (searchCriteria.type && searchCriteria.type !== '') ||
      (searchCriteria.minPrice !== null && searchCriteria.minPrice !== undefined && searchCriteria.minPrice !== 0) ||
      (searchCriteria.maxPrice !== null && searchCriteria.maxPrice !== undefined && searchCriteria.maxPrice !== 0);

    if (hasFilters) {
      // Implement your filter search logic here
      console.log('Filter Search Criteria:', searchCriteria);

      // Call the backend service to filter accommodations
      this.accommodationService.filterAccommodations(searchCriteria).subscribe({
        next: (accommodations) => {
          console.log('Search Results:', accommodations);
          // Do something with the search results, e.g., update UI
        },
        error: (error) => {
          console.error('Search Error:', error);
          // Handle the error, show a message
        },
        complete: () => {
          // This block is called when the observable completes (optional)
        }
      });
    } else {
      // Implement your regular search logic here
      console.log('Regular Search Criteria:', searchCriteria);

      // Call the backend service to search accommodations
      this.accommodationService.searchAccommodations(searchCriteria).subscribe({
        next: (accommodations) => {
          console.log('Search Results:', accommodations);
          // Do something with the search results, e.g., update UI
        },
        error: (error) => {
          console.error('Search Error:', error);
          // Handle the error, show a message
        },
        complete: () => {
          // This block is called when the observable completes (optional)
        }
      });
    }
  }
}
