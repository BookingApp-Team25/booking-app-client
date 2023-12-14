import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePair} from "./model/date-pair";
import {DatePriceElementComponent} from "./date-price-element/date-price-element.component";
import {DatePriceElementModel} from "./model/date-price-element-model";
import {isValidDate} from "rxjs/internal/util/isDate";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationRequest} from "../../accommodation/model/accommodation-request";
import {AccommodationType} from "../../accommodation/model/accommodation-type-enum";
import {AccommodationReservationPolicy} from "../../accommodation/model/accommodation-reservation-policy-enum";
import {Location} from "../../accommodation/model/location";

@Component({
  selector: 'app-accommodation-creation',
  templateUrl: './accommodation-creation.component.html',
  styleUrls: ['./accommodation-creation.component.css']
})
export class AccommodationCreationComponent implements OnInit{
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
  constructor(private fb: FormBuilder, private service : AccommodationService) { }
  ngOnInit(): void {
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
    // Check if both dates are present
    if (startDate && endDate) {
      // Create a new DatePriceElementModel object and push it to the array
      const newDateElement: DatePriceElementModel = {
        startDate: startDate,
        endDate: endDate,
        weekendPrice: this.weekendControl.value,
        summerPrice: this.summerControl.value,
        holidayPrice: this.holidayControl.value,
        winterPrice: this.winterControl.value
      };

      // Push the newDateElement to the array
      this.dateElements.push(newDateElement);

      // Assuming that newDatePair is a form group definition, push it to the datesList
      // Replace this line with the correct form group definition if needed
      this.datesList.push(this.fb.group(newDateElement));

      // Optional: Clear the form controls after adding the date pair
      console.log(this.datesList);
      console.log(this.accommodationForm.value);
    } else {
      // Handle the case where one or both dates are missing
      console.error('Both start and end dates must be selected.');
    }
  }
  get datesList(){
    return this.accommodationForm.get('datesList') as FormArray;
  }
  get propertyList() {
    return this.accommodationForm.get('propertyList') as FormArray;
  }
  addProperty(property : string) {
    this.propertyList.push(this.fb.control(property));
    console.log(this.accommodationForm)
  }
  submitForm() {
    const accommodationRequest: AccommodationRequest = {
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
      availability: { reservations: [] },
      pricelist: {
        dailyPrice: this.accommodationForm.get("pricelist.dailyPrice")?.value,
        weekendPrice: this.accommodationForm.get("pricelist.weekendPrice")?.value,
        seasonPrice: this.accommodationForm.get("pricelist.seasonPrice")?.value,
        holidayPrice: this.accommodationForm.get("pricelist.holidayPrice")?.value,
      },
      price: this.accommodationForm.get("pricelist.dailyPrice")?.value + this.accommodationForm.get("pricelist.weekendPrice")?.value + this.accommodationForm.get("pricelist.seasonPrice")?.value + this.accommodationForm.get("pricelist.holidayPrice")?.value,
      daysBefore: this.accommodationForm.get("daysBefore")?.value,
      policy: AccommodationReservationPolicy.Manual, // Choose the appropriate policy
    };
    this.service.postAccommodationRequest(accommodationRequest).subscribe(
      (response) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error) => {
        console.error('Error making POST request', error);
        // Handle the error
      }
    );
  }
}
