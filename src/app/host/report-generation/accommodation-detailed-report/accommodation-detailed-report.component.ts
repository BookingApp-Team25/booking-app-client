import {Component, ElementRef, ViewChild} from '@angular/core';
import {AccommodationMonthlyLog} from "../../model/accommodation-monthly-log";
import {AccommodationMonthlyLogCollection} from "../../model/accommodation-monthly-log-collection";
import {FormBuilder} from "@angular/forms";
import {AccommodationService} from "../../../accommodation/accommodation.service";
import {ActivatedRoute} from "@angular/router";
import {AccommodationLogCollection} from "../../model/accommodation-log-collection";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

@Component({
  selector: 'app-accommodation-detailed-report',
  templateUrl: './accommodation-detailed-report.component.html',
  styleUrls: ['./accommodation-detailed-report.component.css']
})
export class AccommodationDetailedReportComponent {
  annualReport: AccommodationMonthlyLogCollection;
  accommodationId: string | null;
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  constructor(private service : AccommodationService, private activatedroute:ActivatedRoute) { }
  fetchLogs() {
    if(this.accommodationId == null){
      console.log("Error: accommodation identificator is null")
      return;
    }
    this.service.getAnnualReport(this.accommodationId).subscribe({
      next: (data: AccommodationMonthlyLogCollection) => {
        this.annualReport = data;
        console.log(data);
      },
      error: (_) => {
        console.log("Error loading logs")
      }
    })
  }

  exportToPdf() {
    const contentDiv = this.pdfContent.nativeElement;

    html2canvas(contentDiv, { scale: 0.7 }).then((canvas) => {
      // Convert canvas to image data URL
      const imgData = canvas.toDataURL('image/jpeg');

      // Calculate PDF page size based on the content size
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [contentDiv.offsetWidth, contentDiv.offsetHeight]
      });

      // Add image to PDF
      pdf.addImage(imgData, 'JPEG', 0, 0,700, 0);

      // Save or open the PDF
      pdf.save('exported-content.pdf');
    });
  }

  ngOnInit(){
    console.log("Initializing annular report page");
    this.accommodationId =this.activatedroute.snapshot.paramMap.get("id");
    console.log("accommodation id: " + this.accommodationId);
    this.fetchLogs();
  }
}
