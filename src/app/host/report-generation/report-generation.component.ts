import {Component, ElementRef, ViewChild} from '@angular/core';
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccomomdationLog} from "../model/accomomdation-log";
import {AccommodationLogCollection} from "../model/accommodation-log-collection";
import {HostReservationResponseCollection} from "../../accommodation/model/host-reservation-response-collection";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {range} from "rxjs";
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css']
})
export class ReportGenerationComponent {
  datePickerForm : FormGroup;
  listOfLogs: AccomomdationLog[];
  accommodationEarnings: number[] = [];
  accommodationNames: string[] = [];
  accommodationReservations: number[] = [];

  @ViewChild('pdfContent') pdfContent!: ElementRef;

  constructor(private service: AccommodationService, private authService : AuthService, private fb : FormBuilder){}
  fetchLogs() {
    const username = this.authService.getUsername();
    let startDateControl: any;
    let endDateControl: any;
    let startDate: any;
    let endDate: any;
    if (this.datePickerForm.valid) {
      startDateControl = this.datePickerForm.get('startDate');
      endDateControl = this.datePickerForm.get('endDate');
    }
    if (startDateControl && endDateControl) {
      startDate = startDateControl.value;
      endDate = endDateControl.value;
    }
    console.log("Username:" + username)
    console.log("Beginning date" + startDate.toString())
    console.log("Ending date" + endDate.toString());
    this.service.getAllHostLogs(startDate, endDate,username).subscribe({
      next: (data: AccommodationLogCollection) => {
        this.listOfLogs = []
        this.accommodationNames = [];
        this.accommodationEarnings = [];
        this.accommodationReservations = [];
        console.log(data);
        data.logs.forEach(obj => {
          console.log(obj);
          this.listOfLogs.push(obj);
          this.accommodationEarnings = [...this.accommodationEarnings, obj.totalProfit];
          this.accommodationNames = [...this.accommodationNames, obj.accommodationName];
          this.accommodationReservations = [...this.accommodationReservations, obj.reservationNumber];
          console.log("accommodation earnings: "+ this.accommodationEarnings);
        });
      },
      error: (_) => {
        console.log("Error loading logs")
      }
    })
  }
  ngOnInit(): void {
    this.datePickerForm = this.fb.group({
      startDate: ['',Validators.required],
      endDate: ['',Validators.required]
    });
  }
  exportToPdf() {
    const contentDiv = this.pdfContent.nativeElement;

    html2canvas(contentDiv).then((canvas) => {
      // Convert canvas to image data URL
      const imgData = canvas.toDataURL('image/jpeg');

      // Calculate PDF page size based on the content size
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [contentDiv.offsetWidth, contentDiv.offsetHeight]
      });

      // Add image to PDF
      pdf.addImage(imgData, 'JPEG', 0, 0,450, 0);

      // Save or open the PDF
      pdf.save('exported-content.pdf');
    });
  }

  protected readonly range = range;
}
