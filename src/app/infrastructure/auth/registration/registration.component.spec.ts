import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Role } from '../model/registration-request';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let snackBar: MatSnackBar;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['register']);
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [MatRadioModule, MatInputModule, MatFormFieldModule, 
        MatButtonModule, HttpClientTestingModule,MatSnackBarModule, 
        ReactiveFormsModule, NoopAnimationsModule,RouterTestingModule],
      providers: [MatSnackBar,{ provide: AuthService, useValue: authService }]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when passwords do not match', fakeAsync(() => {
    const successfulResponse = { successful: true, message: 'Registration successful' };
    authService.register.and.returnValue(of(successfulResponse));
    component.registrationForm.patchValue({
      password: 'password1',
      repeatPassword: 'password2'
    });
    spyOn(snackBar, 'open');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Entered passwords don't match", 'Dismiss', {
        duration: 5000,
        panelClass: ['snackbar-error'],
      });
  }));

  it('should call AuthService.register when form is valid', fakeAsync(() => {
    const successfulResponse = { successful: true, message: 'Registration successful' };
    authService.register.and.returnValue(of(successfulResponse));
  
    component.registrationForm.patchValue({
      email: 'petarp@gmail.com',
      password: 'password',
      repeatPassword: 'password',
      phone: '1234567890',
      firstName: 'Petar',
      lastName: 'Petrovic',
      address: 'Bulevar Oslobodjenja 12',
      role: Role.Guest,
    });
    
    spyOn(snackBar, 'open');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith(successfulResponse.message, 'Dismiss', {
      duration: 10000,
      panelClass: ['snackbar'],
    });
  }));

  it('should do nothing if form is not valid', fakeAsync(() => {
    const successfulResponse = { successful: true, message: 'Registration successful' };
    authService.register.and.returnValue(of(successfulResponse));
    component.registrationForm.patchValue({
      password: 'password',
      repeatPassword: 'password'
    });
    spyOn(snackBar, 'open');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();

    expect(authService.register).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
  }));

});
