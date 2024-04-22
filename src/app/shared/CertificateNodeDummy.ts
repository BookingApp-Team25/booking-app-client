// certificate-node.ts

export class CertificateNodeDummy {
    serialNumber: string;
    parent: CertificateNodeDummy | null;
    children: CertificateNodeDummy[];
  
    constructor(serialNumber: string, parent: CertificateNodeDummy | null = null) {
      this.serialNumber = serialNumber;
      this.parent = parent;
      this.children = [];
    }
  }
  