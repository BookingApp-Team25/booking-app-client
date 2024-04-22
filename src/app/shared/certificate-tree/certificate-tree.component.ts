import { Component, Input } from '@angular/core';
import { CertificateNode } from '../CertificateNode';
import { CertificateService } from '../certificateService';
import { CertificateNodeDummy } from '../CertificateNodeDummy';

@Component({
  selector: 'app-certificate-tree',
  templateUrl: './certificate-tree.component.html',
  styleUrls: ['./certificate-tree.component.css']
})
export class CertificateTreeComponent {
  @Input() certificateData: CertificateNodeDummy[]; // @Input() certificateData: CertificateNode[];
  separatedTrees: CertificateNodeDummy[][]; // separatedTrees: CertificateNode[][];

  constructor(private certificateService: CertificateService) { }

  ngOnInit(): void {
    //this.getCertificateHierarchy();

    // Generate dummy data
    const root = new CertificateNodeDummy('Root');
    const child1 = new CertificateNodeDummy('Child 1', root);
    const child2 = new CertificateNodeDummy('Child 2', root);
    const grandchild1 = new CertificateNodeDummy('Grandchild 1', child1);
    const grandchild2 = new CertificateNodeDummy('Grandchild 2', child1);
    const grandchild3 = new CertificateNodeDummy('Grandchild 3', child2);

    root.children.push(child1, child2);
    child1.children.push(grandchild1, grandchild2);
    child2.children.push(grandchild3);

    // Assign dummy data to certificateData property
    this.certificateData = [root, child1, child2, grandchild1, grandchild2, grandchild3];
    this.separatedTrees = this.separateTrees(this.certificateData);
    console.log(this.separatedTrees);    
  }

  // getCertificateHierarchy(): void {
  //   this.certificateService.getCertificateHierarchy()
  //     .subscribe(data => {
  //       this.certificateData = data;
  //       this.separatedTrees = this.separateTrees(this.certificateData);
  //     });
  // }

  separateTrees(nodes: CertificateNodeDummy[]): CertificateNodeDummy[][] { // separateTrees(nodes: CertificateNode[]): CertificateNode[][] {
    //finding the root nodes
    const rootNodes: CertificateNodeDummy[] = []; // const rootNodes: CertificateNode[] = [];
    
    for (const node of nodes) {
      if (node.parent === node || !node.parent)
        rootNodes.push(node);
    }
    
    const separatedTrees: CertificateNodeDummy[][] = []; //const separateTrees: CertificateNode[][] = [];
    //separation of trees through BFS
    for (const rootNode of rootNodes)
      separatedTrees.push(this.bfs(rootNode)) //this.dfs(rootNode)

    //since we have a list of lists(trees) we can separate the levels of trees by checking the nodes parents
    return separatedTrees;
  }

  bfs(rootNode: CertificateNodeDummy): CertificateNodeDummy[] { // bfs(rootNode: CertificateNode, allNodes: CertificateNode[]): CertificateNode[] {
    const queue: CertificateNodeDummy[] = [];
    const visited: CertificateNodeDummy[] = [];

    if (rootNode) {
      queue.push(rootNode);
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      visited.push(current);

      if (current.children) {
        for (const child of current.children) {
          queue.push(child);
        }
      }
    }
    //console.log(visited);
    
    return visited;
  }

  dfs(rootNode: CertificateNodeDummy): CertificateNodeDummy[] {
    const stack: CertificateNodeDummy[] = [];
    const visited: CertificateNodeDummy[] = [];

    if (rootNode) {
      stack.push(rootNode);
    }

    while (stack.length > 0) {
      const current = stack.pop()!;
      visited.push(current);

      if (current.children) {
        for (let i = current.children.length - 1; i >= 0; i--) {
          stack.push(current.children[i]);
        }
      }
    }
    
    //console.log(visited);
    return visited;
  }
  
  buttonClick(serialNumber: String): void {
    console.log(serialNumber);
  }
}
