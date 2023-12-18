import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormControl } from '@angular/forms';
import { PopupService } from '../../services/popup/popup.service';

import { map,Observable, startWith } from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import { SearchCriteria } from 'src/app/accommodation/model/SearchCriteria';

import { AccommodationService } from 'src/app/accommodation/accommodation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  constructor(public dialog : MatDialog, private popupService: PopupService, private accommodationService: AccommodationService) {
  }
  myControl = new FormControl('');
  options: string[] = ['Ankara','Arad','Belgrade','Bucharest','Budapest','Cologne','Dresden',"Duisburg",'Durres'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
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

    let dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '500px',
      height:"300px",
      hasBackdrop: true,
      disableClose: false
    });
    dialogRef.updatePosition({top:topValue,left:leftValue})

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
    // Convert string to Date
    const startDate = this.startDateInput.nativeElement.value ? new Date(this.startDateInput.nativeElement.value) : null;
    const endDate = this.endDateInput.nativeElement.value ? new Date(this.endDateInput.nativeElement.value) : null;

     // Create a search criteria object based on your form inputs
    const searchCriteria: SearchCriteria = {
      location: this.myControl.value,
      numberOfGuests: +this.guestsInput.nativeElement.value,
      dateStart: startDate,
      dateEnd: endDate,
      // Add more properties as needed
    };

    // Implement your search logic here
    console.log('Search Criteria:', searchCriteria);
    // You may call a service or perform other actions based on the search criteria

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
