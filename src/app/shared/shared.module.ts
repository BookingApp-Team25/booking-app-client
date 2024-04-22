import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapInsertionComponent } from './map-insertion/map-insertion.component';
import { CertificateTreeComponent } from './certificate-tree/certificate-tree.component';
import { TreeLevelComponent } from './tree-level/tree-level.component';



@NgModule({
  declarations: [
    MapInsertionComponent,
    CertificateTreeComponent,
    TreeLevelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapInsertionComponent
  ]
})
export class SharedModule { }
