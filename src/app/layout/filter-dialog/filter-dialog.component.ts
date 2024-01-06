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
  typeLabels: string[] = ['Studio', 'Room', 'Apartment', 'House'];

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
    const selectedContents = this.getCheckedValues(this.filterForm, 'contents', this.contentLabels);
    const selectedTypes = this.getCheckedValues(this.filterForm, 'type', this.typeLabels);

    const filterValues = {
      contents: selectedContents,
      type: selectedTypes,
      minPrice: this.filterForm.value.minPrice,
      maxPrice: this.filterForm.value.maxPrice,
    };

    this.filterValues.emit(filterValues);
    this.dialogRef.close();
  }

  getCheckedValues(form: FormGroup, controlName: string, labels: string[]): string[] {
    const formArray = form.get(controlName) as FormArray;
    return formArray.controls.reduce((selected, control, index) => {
      if (control.value === true) {
        selected.push(labels[index]);
      }
      return selected;
    }, [] as string[]);
  }
  
  get contentsControls() {
    return this.getFormArrayControls(this.filterForm, 'contents');
  }

  get typeControls() {
    return this.getFormArrayControls(this.filterForm, 'type');
  }

  private getFormArrayControls(form: FormGroup, controlName: string): AbstractControl[] {
    const formArray = form.get(controlName) as FormArray;
    return formArray.controls;
  }

  getFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
