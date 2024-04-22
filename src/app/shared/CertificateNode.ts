export interface CertificateNode {
    serialNumber: BigInteger;
    parent: CertificateNode;
    children: CertificateNode[];
}