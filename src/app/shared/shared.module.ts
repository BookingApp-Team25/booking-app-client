import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapInsertionComponent } from './map-insertion/map-insertion.component';



@NgModule({
  declarations: [
    MapInsertionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapInsertionComponent
  ]
})
export class SharedModule { }
