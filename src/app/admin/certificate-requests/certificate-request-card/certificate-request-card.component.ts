import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-certificate-request-card',
  templateUrl: './certificate-request-card.component.html',
  styleUrls: ['./certificate-request-card.component.css']
})
export class CertificateRequestCardComponent {
  @Input() summary: any; // Change 'any' to the type of your 'summary' data
}
