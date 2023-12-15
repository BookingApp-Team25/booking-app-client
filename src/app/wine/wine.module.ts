import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WineComponent } from './wine/wine.component';
import { CreateWineComponent } from './create-wine/create-wine.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    WineComponent,
    CreateWineComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    WineComponent,
    CreateWineComponent
  ]
})
export class WineModule { }
