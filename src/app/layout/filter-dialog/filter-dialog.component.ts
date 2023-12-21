import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent {
  filterForm: FormGroup;

  // Add an EventEmitter to emit the filter values
  @Output() filterValues: EventEmitter<any> = new EventEmitter();

  contentLabels: string[] = ['Free wifi', 'Air conditioner', 'Swimming pool', 'Kitchen'];
  typeLabels: string[] = ['Apartment', 'Cabin', 'Studio', 'Villa'];

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      contents: this.createCheckboxes(this.contentLabels),
      type: this.createCheckboxes(this.typeLabels),
      minPrice: [null],
      maxPrice: [null],
    });
  }

  createCheckboxes(labels: string[]): FormArray {
    const checkboxes = labels.map(() => this.fb.control(false));
    return this.fb.array(checkboxes);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApplyFilters(): void {
    // Emit the filter values when the Apply button is clicked
    const selectedContents = this.getFormArrayControls(this.filterForm, 'contents');
    const selectedTypes = this.getFormArrayControls(this.filterForm, 'type');

    const filterValues = {
      contents: selectedContents,
      type: selectedTypes,
      minPrice: this.filterForm.value.minPrice,
      maxPrice: this.filterForm.value.maxPrice,
    };

    this.filterValues.emit(filterValues);
    this.dialogRef.close();
  }

  getFormArrayControls(form: FormGroup, controlName: string): AbstractControl[] {
    const formArray = form.get(controlName) as FormArray;
    return formArray.controls;
  }
  
  getFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  get contentsControls() {
    return this.getFormArrayControls(this.filterForm, 'contents');
  }

  get typeControls() {
    return this.getFormArrayControls(this.filterForm, 'type');
  }
}
