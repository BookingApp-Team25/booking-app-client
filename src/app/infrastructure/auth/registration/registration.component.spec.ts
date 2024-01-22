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
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let snackBar: MatSnackBar;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['register']);
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [AppRoutingModule,MatRadioModule, MatInputModule, MatFormFieldModule, 
        MatButtonModule, HttpClientTestingModule,MatSnackBarModule, 
        ReactiveFormsModule, NoopAnimationsModule,RouterTestingModule],
      providers: [MatSnackBar,{ provide: AuthService, useValue: authService }]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    router=TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when passwords do not match',() => {
    const successfulResponse = { successful: true, message: 'Registration successful' };
    authService.register.and.returnValue(of(successfulResponse));
    component.registrationForm.patchValue({
      password: 'password1',
      repeatPassword: 'password2'
    });
    spyOn(snackBar, 'open');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(snackBar.open).toHaveBeenCalledWith("Entered passwords don't match", 'Dismiss', {
        duration: 5000,
        panelClass: ['snackbar-error'],
      });
  });

  it('should call AuthService.register when form is valid', () => {
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
    spyOn(router,"navigate");

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(snackBar.open).toHaveBeenCalledWith(successfulResponse.message, 'Dismiss', {
      duration: 10000,
      panelClass: ['snackbar'],
    });
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should do nothing if form is not valid', () => {
    const successfulResponse = { successful: true, message: 'Registration successful' };
    authService.register.and.returnValue(of(successfulResponse));
    component.registrationForm.patchValue({
      password: 'password',
      repeatPassword: 'password'
    });
    spyOn(snackBar, 'open');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(authService.register).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
  });

});
