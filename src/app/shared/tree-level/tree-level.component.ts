// tree-level.component.ts

import { Component, Input } from '@angular/core';
import { CertificateNodeDummy } from '../CertificateNodeDummy';

@Component({
  selector: 'app-tree-level',
  templateUrl: './tree-level.component.html',
  styleUrls: ['./tree-level.component.css']
})
export class TreeLevelComponent {
  @Input() nodes: CertificateNodeDummy[] = [];
  @Input() level: number = 0;

  constructor() { }

  buttonClick(serialNumber: String): void {
    console.log(serialNumber);
  }
}
