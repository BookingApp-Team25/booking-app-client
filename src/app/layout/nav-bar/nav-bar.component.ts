import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { PopupService } from '../../services/popup/popup.service';

import { map,Observable, startWith } from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  constructor(public dialog : MatDialog, private popupService: PopupService) {
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
}
