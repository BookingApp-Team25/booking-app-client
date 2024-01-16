import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePair} from "./model/date-pair";
import {DatePriceElementModel} from "./model/date-price-element-model";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationRequest} from "../../accommodation/model/accommodation-request";
import {AccommodationType} from "../../accommodation/enum/accommodation-type-enum";
import {AccommodationReservationPolicy} from "../../accommodation/enum/accommodation-reservation-policy-enum";
import {AccommodationDatePeriod} from "../../accommodation/model/accommodation-date-period";
import { ActivatedRoute } from '@angular/router'
import {Calendar} from "../../accommodation/model/calendar";
@Component({
  selector: 'app-accommodation-creation',
  templateUrl: './accommodation-creation.component.html',
  styleUrls: ['./accommodation-creation.component.css']
})
export class AccommodationCreationComponent implements OnInit{
  totalPrice: number;
  amenities : string[] = [];
  editedAccommodation : AccommodationRequest;
  editId : string | null;
  weekendControl: FormControl = new FormControl(false);
  summerControl: FormControl = new FormControl(false);
  holidayControl: FormControl = new FormControl(false);
  winterControl: FormControl = new FormControl(false);
  today = new Date()
  accommodationForm: FormGroup;
  dateElements : DatePriceElementModel[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  periods : DatePair[] = []
  constructor(private fb: FormBuilder, private service : AccommodationService, private activatedroute:ActivatedRoute) { }
  initializeFormEdit() : void {
    console.log("Amenities:")
    console.log(this.editedAccommodation.amenities);
    this.accommodationForm.patchValue({
      name: this.editedAccommodation.name,
      description: this.editedAccommodation.description,
      minGuests: this.editedAccommodation.minGuests,
      maxGuests: this.editedAccommodation.maxGuests,
      daysBefore: this.editedAccommodation.daysBefore,
      pricelist: {
        dailyPrice: this.editedAccommodation.pricelist.dailyPrice,
        weekendPrice: this.editedAccommodation.pricelist.weekendPrice,
        seasonPrice: this.editedAccommodation.pricelist.seasonPrice,
        holidayPrice: this.editedAccommodation.pricelist.holidayPrice,
      },
      calculationPreference: 'perUnit',
      country: this.editedAccommodation.location.country,
      city: this.editedAccommodation.location.city,
      street: this.editedAccommodation.location.street,
      streetNumber: this.editedAccommodation.location.streetNumber,
    });
    this.editedAccommodation.amenities.forEach((element) => {
      this.propertyList.push(this.fb.control(element));
      this.amenities.push(element);
      console.log(element)
    });

    for (const dateElement of this.editedAccommodation.availability) {
      console.log("DATE ELEMENT " + dateElement)
      const newDateElement: DatePriceElementModel = {
        startDate: dateElement.startDate,
        endDate: dateElement.endDate,
        weekendPrice: false,
        summerPrice: false,
        holidayPrice: false,
        winterPrice: false
      };
      this.datesList.push(newDateElement);
      console.log(newDateElement);
      this.dateElements.push(newDateElement);
    }
  }
  initializeFormCreate() : void{
    this.accommodationForm = this.fb.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      minGuests : ['', Validators.required],
      maxGuests : ['', Validators.required],
      daysBefore : ['',Validators.required],
      pricelist : this.fb.group({
        dailyPrice : [0],
        weekendPrice : [0],
        seasonPrice : [0],
        holidayPrice : [0]
      }),
      calculationPreference : ['perUnit', Validators.required],
      propertyList : this.fb.array([]),
      country : [''],
      city : [''],
      street : [''],
      streetNumber : [''],
      datesList : this.fb.array<DatePriceElementModel>([])
    });
  }
  ngOnInit(): void {;
    this.totalPrice = 0;
    this.initializeFormCreate();
    this.editId =this.activatedroute.snapshot.paramMap.get("id");
    if(this.editId != null){ // editovanje, prvo popunjavamo formu
      this.service.getAccommodationById(this.editId).subscribe(
          (response) => {
            console.log('EDITING ACCOMMODATION' + this.editId, response);
            this.editedAccommodation = response;
            this.initializeFormEdit();
          },
          (error) => {
            console.error('Error making POST request', error);
          }
      );
    }
    console.log(this.accommodationForm)
  }
  isPeriodValid(startDate:Date | null, endDate:Date | null) : boolean {
    if(startDate == null || endDate == null){
      return false;
    }
    //(StartDate1 <= EndDate2) and (StartDate2 <= EndDate1)
    for(const dateElement of this.dateElements){
      if((startDate <= dateElement.endDate && dateElement.startDate <= endDate)){
        return false;
      }
    }
    return true;
  }
  addDatePair() {
    // Extract values from form controls
    const startDate = this.range.get('start')?.value as Date | null;
    const endDate = this.range.get('end')?.value as Date | null;
    if(!this.isPeriodValid(startDate,endDate)){
      console.error("invalid date period")
      return
    }
    if (startDate && endDate) {
      const newDateElement: DatePriceElementModel = {
        startDate: startDate,
        endDate: endDate,
        weekendPrice: this.weekendControl.value,
        summerPrice: this.summerControl.value,
        holidayPrice: this.holidayControl.value,
        winterPrice: this.winterControl.value
      };


      this.dateElements.push(newDateElement);
      this.datesList.push(this.fb.group(newDateElement));


      console.log(this.datesList);
    } else {

      console.error('Both start and end dates must be selected.');
    }
  }
  get datesList(){
    return this.accommodationForm.get('datesList')?.value as FormArray;
  }
  get propertyList() {
    return this.accommodationForm.get('propertyList') as FormArray;
  }
  addProperty(property : string) {
    this.propertyList.push(this.fb.control(property));
    console.log(this.accommodationForm)
  }
  submitForm() {
    const datePeriods : AccommodationDatePeriod[] = [];
    for(const datePrice of this.dateElements){
      const datePeriod : AccommodationDatePeriod = {
        startDate : datePrice.startDate,
        endDate : datePrice.endDate
      };
      datePeriods.push(datePeriod);
    }
    const accommodationRequest: AccommodationRequest = {
      hostId : "5894d69d-fc8d-4f06-bf0c-dc695b40901b",
      name: this.accommodationForm.get("name")?.value,
      description: this.accommodationForm.get("description")?.value,
      location: {
        country: this.accommodationForm.get("country")?.value,
        city : this.accommodationForm.get("city")?.value,
        street : this.accommodationForm.get("street")?.value,
        streetNumber : this.accommodationForm.get("streetNumber")?.value
      },
      amenities: this.accommodationForm.get("propertyList")?.value,
      photos: ['Photo1.jpg', 'Photo2.jpg'],
      minGuests: this.accommodationForm.get("minGuests")?.value,
      maxGuests: this.accommodationForm.get("maxGuests")?.value,
      type: AccommodationType.Studio, // Choose the appropriate type
      pricelist: {
        dailyPrice: this.accommodationForm.get("pricelist.dailyPrice")?.value,
        weekendPrice: this.accommodationForm.get("pricelist.weekendPrice")?.value,
        seasonPrice: this.accommodationForm.get("pricelist.seasonPrice")?.value,
        holidayPrice: this.accommodationForm.get("pricelist.holidayPrice")?.value,
      },
      price: 0,
      daysBefore: this.accommodationForm.get("daysBefore")?.value,
      policy: AccommodationReservationPolicy.Manual, // Choose the appropriate policy
      availability: datePeriods,
      hostUsername:'',
      rating: 0
    };
    console.log("Accommodation" + accommodationRequest);
    if(this.editId != null){
      this.service.editAccommodationRequest(accommodationRequest, this.editId).subscribe(
        (response) => {
          console.log('POST request successful', response);
          alert("New edit request created, waiting for approval");
        },
        (error) => {
          console.error('Error making POST request', error);
          // Handle the error
        }
      );
    }
    else{
      this.service.createAccommodationRequest(accommodationRequest).subscribe(
        (response) => {
          console.log('POST request successful', response);
          alert("New accommodation request created, waiting for approval");
        },
        (error) => {
          console.error('Error making POST request', error);
          // Handle the error
        }
      );
    }
  }
}
