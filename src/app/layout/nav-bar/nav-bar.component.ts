import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { map,Observable, startWith } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['Ankara','Arad','Belgrade','Bucharest','Budapest','Cologne','Dresden',"Duisburg",'Durres'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  @Output() accountButtonClick = new EventEmitter<void>();
   onAccountButtonClick() {
    this.accountButtonClick.emit();
  }
    }
