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

  buttonClickAddNode(node: CertificateNodeDummy): void {
    const newNode = new CertificateNodeDummy('New Dummy Node');
    console.log("New node created.");

    node.children.push(newNode);
  }
}
