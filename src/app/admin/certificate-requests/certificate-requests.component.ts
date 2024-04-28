import { Component, OnInit } from '@angular/core';
import { CertificateRequestCardComponent } from './certificate-request-card/certificate-request-card.component';

@Component({
  selector: 'app-certificate-requests',
  templateUrl: './certificate-requests.component.html',
  styleUrls: ['./certificate-requests.component.css']
})
export class CertificateRequestsComponent implements OnInit {
  summaries: any[] = [];

  constructor(){}

  ngOnInit(): void {
    this.summaries = this.fetchCertificateRequestSummaries();
  }

  fetchCertificateRequestSummaries(): any[] {
    // Call your service method here to fetch certificate request summaries
    // and return the data
    // Example:
    // return this.certificateService.getCertificateRequestSummaries();
    // Make sure to handle any asynchronous operations appropriately
    return [
      { summary: 'Summary 1' },
      { summary: 'Summary 2' },
      { summary: 'Summary 3' }
    ]; // Dummy data for demonstration
  }
}
