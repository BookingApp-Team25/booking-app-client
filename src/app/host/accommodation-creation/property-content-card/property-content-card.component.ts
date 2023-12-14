import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-property-content-card',
  templateUrl: './property-content-card.component.html',
  styleUrls: ['./property-content-card.component.css']
})
export class PropertyContentCardComponent implements OnInit{
  properties : string[] = [];
  newProperty : string = '';
  @Output() onPropertyInserted = new EventEmitter<string>();
  ngOnInit(): void {
    console.log(this.properties);
  }
  addProperty(): void {
    if(this.newProperty == ''){
      console.log("cant insert empty property!")
    }
    else{
      this.properties.push(this.newProperty);
      this.onPropertyInserted.emit(this.newProperty);
    }
  }


}
