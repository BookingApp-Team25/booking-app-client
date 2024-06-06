import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { map,Observable, startWith } from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/infrastructure/auth/login/login.component';
import { AccommodationService } from 'src/app/accommodation/accommodation.service';
import { SearchCriteria } from 'src/app/accommodation/model/SearchCriteria';
import {KeycloakService} from "../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    public dialog : MatDialog,
    public authService:AuthService,
    private router:Router,
    private accommodationService: AccommodationService,
    private fb: FormBuilder,
    private keycloakService: KeycloakService
  ) {}

  role: string='';
  myControl = new FormControl('');
  options: string[] = ['Ankara','Arad','Belgrade','Bucharest','Budapest','Cologne','Dresden',"Duisburg",'Durres'];
  filteredOptions: Observable<string[]>;

  filterContents: string[] = [];
  filterType: string = '';
  filterMinPrice: number = 0;
  filterMaxPrice: number = 0;

  ngOnInit() {
    // Create the form group and add the FormControl to it
    this.searchForm = this.fb.group({
      myControl: this.myControl
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.authService.userState.subscribe((result) => {
      this.role = result;
    })
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
      console.log('Filter Values:', values);

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
      (searchCriteria.type && searchCriteria.type !== '' && searchCriteria.type.length > 0) ||
      (searchCriteria.minPrice !== null && searchCriteria.minPrice !== undefined && searchCriteria.minPrice !== 0) ||
      (searchCriteria.maxPrice !== null && searchCriteria.maxPrice !== undefined && searchCriteria.maxPrice !== 0);

    if (hasFilters) {
      console.log('Filter Search Criteria:', searchCriteria);

      this.accommodationService.filterAccommodations(searchCriteria).subscribe({
        next: (accommodations) => {
          console.log('Search Results:', accommodations);
        },
        error: (error) => {
          console.error('Search Error:', error);
        },
        complete: () => {
        }
      });
    } else {
      console.log('Regular Search Criteria:', searchCriteria);

      this.accommodationService.searchAccommodations(searchCriteria).subscribe({
        next: (accommodations) => {
          console.log('Search Results:', accommodations);
        },
        error: (error) => {
          console.error('Search Error:', error);
        },
        complete: () => {
        }
      });
    }
  }
  accountManagement(){
    this.authService.accountManagement();
  }
  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '300px',
      disableClose: true, // Disables closing by clicking outside the dialog
    });
  }

  logOut(): void {
    this.authService.logout();
  }
}
