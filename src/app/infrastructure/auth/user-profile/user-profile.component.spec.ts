import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {of} from "rxjs";
import {AuthService} from "../auth.service";
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AccountDetails} from "../model/account-details";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBar: MatSnackBar;
  beforeEach(() => {


      authServiceSpy = jasmine.createSpyObj('AuthService', ['accountDetails','editAccount']);
      const accountDetailsMock : AccountDetails = {
              id: "mockId",
              username: "mockUsername",
              firstName: "mockFirstname",
              lastName: "mockLastname",
              address: 'mockAddress',
              phoneNumber: 'mockPhonenumber',
              rating: 5
      }
      authServiceSpy.accountDetails.and.returnValue(of(accountDetailsMock));
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
          HttpClientTestingModule,
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          MatSnackBarModule,
          MatDialogModule,
          MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          NoopAnimationsModule,
          MatCardModule
      ],
        providers: [MatSnackBar,{ provide: AuthService, useValue: authServiceSpy }]
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call edit account(Valid form)", () =>{
    const successfulResponse = { successful: true, message: 'Edit successful' };
    authServiceSpy.editAccount.and.returnValue(of(successfulResponse));

    component.editForm.controls['firstName'].setValue("Miroslav");
    component.editForm.controls['lastName'].setValue("Blagojevic");
    component.editForm.controls['phone'].setValue('0662366336');
    component.editForm.controls['address'].setValue("Adresa");

    expect(component.editForm.valid).toBeTruthy();
      spyOn(snackBar, 'open');
      let button = fixture.debugElement.nativeElement.querySelector('#edit-button');
      button.click();
      fixture.detectChanges();

    expect(snackBar.open).toHaveBeenCalled();

  })
    it("form should be invalid, invalid values", () =>{

        component.editForm.controls['firstName'].setValue("a");
        component.editForm.controls['lastName'].setValue("adwadwadwadawdwadaw");
        component.editForm.controls['phone'].setValue('2323232323232');
        component.editForm.controls['address'].setValue("a");

        expect(component.editForm.valid).toBeFalsy();
    })
    it("form should be invalid, empty fields", () =>{

        component.editForm.controls['firstName'].setValue("");
        component.editForm.controls['lastName'].setValue("");
        component.editForm.controls['phone'].setValue('');
        component.editForm.controls['address'].setValue("");

        expect(component.editForm.valid).toBeFalsy();
    })
});
